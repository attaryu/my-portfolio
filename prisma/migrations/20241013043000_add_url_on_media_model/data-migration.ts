import { PrismaClient } from '@prisma/client';
import { list } from '@vercel/blob';

import { mediaBlobPath } from '@/utils/blob';

const prisma = new PrismaClient();

async function dataMigration() {
  const blobList = await list();

  await prisma.$transaction(
    async (client) => {
      const medias = await client.media.findMany();

      for (const media of medias) {
        const blobUrl = blobList.blobs.find(
          ({ pathname }) => pathname === mediaBlobPath(media),
        );

        if (blobUrl) {
          await client.media.update({
            where: { id: media.id },
            data: { url: blobUrl.pathname },
          });
        } else {
          await client.media.delete({ where: { id: media.id } });
        }
      }
    },
    { maxWait: 30000, timeout: 60000 },
  );
}

dataMigration()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
