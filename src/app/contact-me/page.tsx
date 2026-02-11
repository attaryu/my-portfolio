import Link from 'next/link';

export default function ContactMePage() {
	return (
		<main className="h-[95dvh] flex flex-col items-center justify-center gap-8">
			<h1 className="text-4xl font-neue-montreal">
				Oops, this page is under construction...
			</h1>

			<Link href="/" className="underline text-xl font-neue-montreal">
				Go back to Home
			</Link>
		</main>
	);
}
