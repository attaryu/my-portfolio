export const mediaBlobPath = ({
  extension,
  title,
}: {
  extension: string;
  title: string;
}) => `${extension}/${title}.${extension}`;
