import { MdCall, MdLocationOn, MdMail, MdArrowUpward, MdShare } from 'react-icons/md';

import ProjectCard from '@/components/ProjectCard';
import { logos, projects, socialMedias } from '@/utils/constant';

export default function Home() {
  const date = new Date();

  return (
    <>
      <main>
        {/* grid area */}
        <div>
          {/* grid backgroud */}
          <div
            className="absolute top-0 w-full grid grid-cols-[repeat(auto-fit,_minmax(2rem,_1fr))] -z-10 after:contents-['test'] after:block after:bg-gradient-to-t after:from-white after:to-transparent after:w-full after:h-1/5 after:absolute after:bottom-0 after:left-0"
          >
            {Array(50 * 37).fill(1).map((box, i) => (
              <div key={box + i} className="w-full pt-[100%] border border-l-zinc-100 border-b-zinc-100" />
            ))}
          </div>

          {/* cover */}
          <section className="pt-16 h-dvh max-h-highest px-20 flex flex-col justify-center items-center">
            <h1 className="mt-auto text-5xl font-tusker-grotesk-medium">HELLO, I'M ATTAR</h1>

            <div className="w-full py-5 flex justify-between items-center mt-auto">
              <time dateTime={date.toISOString()}>{date.toLocaleString()}</time>
              <p>&copy;2024 All rights reserved.</p>
            </div>
          </section>

          {/* about me */}
          <section className="h-[95dvh] max-h-highest grid place-items-center">
            <p className="text-3xl text-center w-1/2 leading-relaxed">
              I'm 19 years old, with almost 3 years of in-depth experience in web development field. While I haven't stepped into the professional world yet, I've honed my skills through a variety of online courses, collaborative projects, solo projects, and even hackathons. Whether collaborating on a team or venturing solo, my ethos remains rooted in upholding best practices and ensuring precision.
            </p>
          </section>
        </div>

        {/* tech skill */}
        <section className="w-full overflow-hidden py-32">
          <h2 className="font-neue-montreal-medium text-5xl -rotate-1 px-20">
            Proudly presenting my expertise coupled with an understanding of the technology I use.
          </h2>

          <ul
            className="relative w-full h-96 -rotate-1 my-24 grid grid-rows-2 grid-cols-7 place-items-center gap-x-12 before:contents-[''] before:block before:w-1/6 before:h-full before:absolute before:-left-2 before:bg-gradient-to-l before:from-transparent before:to-white before:pointer-events-none before:z-10 after:contents-[''] after:block after:w-1/6 after:h-full after:absolute after:-right-2 after:bg-gradient-to-r after:from-transparent after:to-white after:pointer-events-none after:z-10"
          >
            {logos.map((logo) => (
              <img
                key={logo}
                src={`/logo/${logo}-light.svg`}
                alt={`${logo}'s logo`}
                className="w-full p-8 border border-zinc-900 rounded-xl hover:scale-105 hover:shadow-2xl transition duration-300"
              />
            ))}
          </ul>

          <p className="mx-auto -rotate-1 px-20 text-right">
            <span className="w-2/3 inline-block">
              Even though I navigate a variety of technologies, mastery of certain technologies still eludes me; Nevertheless, I accepted the journey of rediscovering these tools in a short time.
            </span>
          </p>
        </section>

        {/* some word */}
        <section>
          <p className="w-full h-[200dvh] max-h-[1600px] grid place-items-center grid-rows-2">
            <span className="font-tusker-grotesk-semibold text-7xl">MAKE YOUR DREAM WEBSITE...</span>
            <span className="font-tusker-grotesk-medium text-[14rem]">INTO A REALITY</span>
          </p>
        </section>

        {/* showcase selected project */}
        <section className="px-20 my-32">
          <h2 className="font-neue-montreal-medium text-4xl text-center">
            There are my selected project
          </h2>

          <ul className="mt-14 space-y-16">
            {projects.map((data) => (
              <li key={data.id} >
                <ProjectCard project={data} detailURL={data.detailURL} />
              </li>
            ))}
          </ul>
        </section>

        {/* offering project */}
        <section className="p-20 my-16 h-dvh max-h-highest relative flex flex-col">
          <p className="text-[5.5rem] leading-none font-neue-montreal-medium">
            Don't you think about creating a masterpiece together after seeing all that?
          </p>

          <img src="/ui_assets/wave-light.svg" alt="" className="absolute w-full left-0 top-1/2" />

          <p className="mt-auto self-end text-2xl font-neue-montreal-medium">
            <a href="#" className="bg-zinc-900 text-zinc-100 py-4 px-6 rounded-full mr-5">
              Contact Me
            </a>{' '}
            right now!
          </p>
        </section>

        {/* my social media and etc */}
        <section className="px-20 mt-32 mb-14">
          <div className="flex justify-between">
            <h2 className="font-tusker-grotesk-medium text-[9rem] leading-[1.1] w-full">
              HOW TO<br />
              FIND ME
            </h2>

            <div className="flex content-end items-end justify-end gap-x-6 gap-y-4 flex-wrap">
              {socialMedias.map((data) => (
                <a
                  key={data.id}
                  href={data.url}
                  target="_blank"
                  className="py-3 px-6 border border-zinc-900 rounded-full text-xl"
                >
                  {data.title}
                </a>
              ))}
            </div>
          </div>

          <div className="flex justify-between border-t border-t-zinc-800 p-5 mt-16">
            <address className="flex gap-4 items-center not-italic text-xl">
              <MdLocationOn className="text-3xl" /> Brantas street, Jombang, East Java, INA
            </address>

            <a href="#" className="flex gap-4 items-center not-italic text-xl">
              <MdMail className="text-3xl" /> mattarannaufal@gmail.com
            </a>

            <a href="#" className="flex gap-4 items-center not-italic text-xl">
              <MdCall className="text-3xl" /> (+62) 857 0707 1585
            </a>
          </div>
        </section>
      </main>

      <footer className="w-full flex justify-between py-5 px-20 bg-zinc-900 text-zinc-100">
        <button className="flex items-center gap-2 text-lg">Back to top <MdArrowUpward /></button>

        <p>&copy;2024 All rights reserved.</p>

        <button className="flex items-center gap-2 text-lg">Share <MdShare /></button>
      </footer>
    </>
  );
}
