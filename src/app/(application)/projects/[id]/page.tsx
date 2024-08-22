import { MdNorthEast, MdOutlineFeedback, MdShare } from 'react-icons/md';

type Props = {
  params: { id: string };
};

export default function Page({ params }: Readonly<Props>) {
  const data = {
    title: 'uBook',
    shortDescription: 'Bookmarking your real life books, or digital books.',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo provident, eum ullam nisi quaerat voluptates eaque nemo voluptas quisquam ea temporibus praesentium tempora accusamus est optio et error quidem cumque cum suscipit similique fuga adipisci exercitationem? Fuga iste minus tenetur accusantium veritatis eos maxime alias atque, nam velit, ducimus quis.',
    projectType: 'Personal Project',
    coverImage:
      'https://images.unsplash.com/photo-1514894780887-121968d00567?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    previewImage: [
      'https://images.unsplash.com/photo-1602530648160-de3acee5d7ac?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1707836868495-3307d371aba4?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1651573090587-750163a41ce1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1543069190-9d380c458bc2?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    journey:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, sed? Fugit voluptatum dolorem aliquid ad esse facere suscipit obcaecati maxime excepturi architecto, tempore totam, iste repellat dolorum qui explicabo vitae? Explicabo perspiciatis molestiae fugiat adipisci maiores nemo! Delectus modi animi odio dolores earum quaerat magnam corporis rerum dicta magni vero ipsum sunt excepturi quod dignissimos perspiciatis dolorum minus molestias placeat, doloremque architecto. Atque ipsa facere id repellat modi at quasi, delectus distinctio vero nisi deserunt deleniti voluptatibus et quibusdam quos eaque magnam ducimus debitis, inventore earum veritatis. Aut modi beatae aperiam cum. Voluptatibus commodi fugit excepturi animi, et vel ad esse, est libero nulla sunt nemo eligendi eaque, amet blanditiis illum harum doloribus quae unde saepe consectetur voluptate asperiores provident? Animi incidunt eos consectetur atque non vero optio, id soluta molestias! Aliquam, laudantium voluptatum eligendi soluta, aspernatur maxime earum dolorem tempore ad blanditiis, recusandae consequatur deleniti veritatis! Doloremque, ipsam vel.',
    additionalLink: [
      {
        title: 'Codebase',
        linkTitle: 'GitHub',
        link: '/#',
      },
      {
        title: 'Design File',
        linkTitle: 'Figma',
        link: '/#',
      },
      {
        title: 'Live Production',
        linkTitle: 'uBook',
        link: '/#',
      },
      {
        title: 'Feedback',
        linkTitle: 'Google Form',
        link: '/#',
      },
    ],
    techStack: [
      {
        title: 'Next JS',
        image: 'nextjs',
      },
      {
        title: 'My SQL',
        image: 'mysql',
      },
      {
        title: 'Tailwind CSS',
        image: 'tailwindcss',
      },
      {
        title: 'GSAP',
        image: 'gsap',
      },
    ],
  };

  return (
    <main>
      <section className="detail-project-grid-template grid h-screen place-items-center gap-y-4 px-8 py-2 md:px-20 xl:gap-y-4 xl:py-6">
        <h1 className="col-span-2 font-tusker-grotesk-medium text-6xl md:col-span-1 md:row-span-2 md:justify-self-start md:text-8xl">
          {data.title.toUpperCase()}
        </h1>

        <img
          src={data.coverImage}
          className="col-span-2 h-full w-full overflow-hidden rounded-2xl object-cover"
          alt=""
        />
        <p className="col-span-2 justify-self-start text-xl md:col-span-1 md:col-start-2 md:row-start-2 md:self-start md:justify-self-end md:text-end md:text-lg lg:text-xl">
          {data.shortDescription}
        </p>

        <p className="w-fit self-start justify-self-start rounded-full border border-zinc-900 px-2.5 py-1.5 md:col-start-2 md:row-start-1 md:self-end md:justify-self-end lg:px-4 lg:text-lg">
          {data.projectType}
        </p>

        <div className="flex items-center justify-end gap-6 self-start justify-self-end md:col-start-2 md:self-center lg:gap-8">
          <a
            href={`/project/${params.id}`}
            className="text-2xl md:text-3xl lg:text-4xl xl:text-3xl"
          >
            <MdShare />
          </a>

          <a
            href={`/project/${params.id}`}
            className="text-2xl md:text-3xl lg:text-4xl xl:text-3xl"
          >
            <MdOutlineFeedback />
          </a>

          <a
            href={`/project/${params.id}`}
            className="text-2xl md:text-3xl lg:text-4xl xl:text-3xl"
          >
            <MdNorthEast />
          </a>
        </div>
      </section>

      <section className="space-y-4 px-8 md:mt-12 md:px-20 xl:space-y-6">
        <h2 className="font-neue-montreal-medium text-3xl md:text-4xl">
          What is on over?
        </h2>

        <p className="text-justify !leading-relaxed md:text-lg xl:text-xl">
          {data.description}
        </p>
      </section>

      <section className="mt-12 space-y-6 xl:mt-20 xl:space-y-8">
        <h2 className="px-8 font-neue-montreal-medium text-3xl md:px-20 md:text-4xl">
          Preview
        </h2>

        <div className="flex gap-8 overflow-x-auto px-8 md:px-20">
          {data.previewImage.map((img) => (
            <img
              key={img}
              src={img}
              alt=""
              className="aspect-[1/1.2] w-64 rounded-xl object-cover shadow-lg md:w-[30rem] xl:aspect-[2/1] xl:w-[75rem] xl:rounded-2xl"
            />
          ))}
        </div>
      </section>

      <section className="mt-12 space-y-6 xl:mt-20 xl:space-y-8">
        <h2 className="px-8 font-neue-montreal-medium text-3xl md:px-20 md:text-4xl">
          Tech Stack
        </h2>

        <ul className="flex flex-wrap gap-4 overflow-x-auto px-8 md:px-20">
          {data.techStack.map((tech) => (
            <li
              key={tech.title}
              className="flex items-center gap-2 rounded-full border border-zinc-900 px-2.5 py-1.5 md:gap-3 md:px-3 md:py-2"
            >
              <img
                src={`/logo/${tech.image}.svg`}
                alt={`${tech.title}'s logo`}
                className="size-9 p-1 md:size-10"
              />
              <p className="inline-block font-neue-montreal-medium md:text-lg">
                {tech.title}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 space-y-4 px-8 md:mt-12 md:px-20 xl:mt-20 xl:space-y-6">
        <h2 className="font-neue-montreal-medium text-3xl md:text-4xl">
          The Journey
        </h2>

        <p className="text-justify !leading-relaxed md:text-lg xl:text-xl">
          {data.journey}
        </p>
      </section>

      <section className="mt-12 space-y-4 px-8 md:mt-12 md:px-20 xl:mt-20 xl:space-y-6 mb-16">
        <h2 className="font-neue-montreal-medium text-3xl md:text-4xl">
          Additional Link
        </h2>

        <ul>
          {data.additionalLink.map((link) => (
            <li key={link.title} className="pt-2 md:pt-4">
              <div className="flex items-end justify-between py-2 md:py-3">
                <p
                  className="font-neue-montreal-medium text-2xl md:text-4xl"
                >
                  {link.title}
                </p>

                <p
                  className="flex items-center gap-2 opacity-50 md:text-xl md:opacity-70"
                >
                  {link.linkTitle}
                  <MdNorthEast />
                </p>
              </div>
              <div className="h-[1px] w-full bg-zinc-900" />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
