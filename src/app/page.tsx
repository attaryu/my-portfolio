import { MdCall, MdLocationOn, MdMail } from 'react-icons/md';

import Button from '@/components/Button';
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
          <div className="absolute top-0 w-full overflow-hidden h-[230vh] xl:h-fit grid grid-cols-[repeat(auto-fit,_minmax(2rem,_1fr))] -z-10 after:contents-[''] after:block after:bg-gradient-to-t after:from-white after:to-transparent after:w-full after:h-1/5 after:absolute after:bottom-0 after:left-0">
            {Array(50 * 37).fill(1).map((box, i) => (
              <div key={box + i} className="grid-box w-full pt-[100%] border border-l-zinc-50 border-b-zinc-50" />
            ))}
          </div>

          {/* cover */}
          <section className="pt-16 h-[90vh] xl:h-dvh max-h-highest px-8 flex flex-col gap-10 sm:px-20 sm:items-center">
            <h1 className="font-tusker-grotesk-medium text-7xl sm:text-5xl leading-tight mt-auto">
              HELLO, <br className="sm:hidden" />
              I'M ATTAR
            </h1>

            <div className="w-full sm:py-5 py-8 flex justify-between flex-col sm:flex-row sm:mt-auto sm:items-center">
              <time dateTime={date.toISOString()}>{date.toLocaleString()}</time>
              <p>&copy;2024 All rights reserved.</p>
            </div>
          </section>

          {/* about me */}
          <section className="h-screen sm:h-[95dvh] max-h-highest grid place-items-center px-8">
            <p className="text-xl sm:text-4xl sm:text-center sm:w-1/2 leading-relaxed">
              I'm 19 years old, with almost 3 years of in-depth experience in web development field. While I haven't stepped into the professional world yet, I've honed my skills through a variety of online courses, collaborative projects, solo projects, and even hackathons. Whether collaborating on a team or venturing solo, my ethos remains rooted in upholding best practices and ensuring precision.
            </p>
          </section>
        </div>

        {/* tech skill */}
        <section className="w-full py-14 sm:py-32 overflow-hidden">
          <h2 className="font-neue-montreal-medium text-3xl sm:text-5xl -rotate-1 px-8 sm:px-20">
            Proudly presenting my expertise coupled with an understanding of the technology I use.
          </h2>

          <div className="my-16 xl:my-24 relative -rotate-1 before:contents-[''] before:block before:w-1/4 before:xl:w-1/6 before:h-full before:absolute before:-left-1 before:bg-gradient-to-l before:from-transparent before:to-white before:pointer-events-none before:z-10 after:contents-[''] after:block after:w-1/4 after:xl:w-1/6 after:h-full after:absolute after:top-0 after:-right-1 after:bg-gradient-to-r after:from-transparent after:to-white after:pointer-events-none after:z-10">
            <div className="w-full overflow-x-auto">
              <ul
                className="w-full min-w-[750px] h-56 xl:h-96 grid grid-rows-2 grid-cols-7 place-items-center gap-x-6 md:gap-x-12"
              >
                {logos.map((logo) => (
                  <img
                    key={logo}
                    src={`/logo/${logo}-light.svg`}
                    alt={`${logo} logo`}
                    className="w-full p-4 xl:p-8 border border-zinc-900 rounded-lg xl:rounded-xl"
                  />
                ))}
              </ul>
            </div>
          </div>

          <p className="mx-auto -rotate-1 px-8 sm:px-20 text-right text-sm xl:text-lg leading-tight">
            <span className="md:w-2/3 md:inline-block">
              Even though I navigate a variety of technologies, mastery of certain technologies still eludes me; Nevertheless, I accepted the journey of rediscovering these tools in a short time.
            </span>
          </p>
        </section>

        {/* some word */}
        <section>
          <p className="w-full h-[150vh] xl:h-[200vh] max-h-[1600px] grid place-items-center grid-rows-2">
            <span className="font-tusker-grotesk-semibold text-center text-6xl xl:text-7xl leading-snug">
              MAKE YOUR <br className="md:hidden" />
              DREAM WEBSITE...
            </span>

            <span className="font-tusker-grotesk-medium whitespace-nowrap text-6xl xl:text-[14rem]">
              INTO A REALITY
            </span>
          </p>
        </section>

        {/* showcase selected project */}
        <section className="px-8 xl:px-20 my-32">
          <h2 className="font-neue-montreal-medium text-4xl xl:text-6xl text-center">
            There are my <br className="xl:hidden" />
            selected project
          </h2>

          <ul className="mt-14 space-y-8 xl:space-y-16">
            {projects.map((data) => (
              <li key={data.id} >
                <ProjectCard project={data} detailURL={data.detailURL} />
              </li>
            ))}
          </ul>
        </section>

        {/* offering project */}
        <section className="py:16 px-8 xl:p-20 my-16 h-[80vh] xl:h-screen max-h-highest relative flex flex-col overflow-hidden">
          <p className="text-[3.4rem] xl:text-[5.5rem] leading-none font-neue-montreal-medium">
            Don't you think about making a masterpiece together after seeing all that?
          </p>

          <img src="/ui_assets/wave-light.svg" alt="" className="absolute w-full right-1/3 xl:left-0 xl:w-full top-3/4 xl:top-1/2 scale-[2.7] xl:scale-100 -rotate-5 xl:rotate-0" />

          <p className="mt-auto self-end font-neue-montreal-medium flex gap-4 xl:gap-8 items-center">
            <Button href="#" primary>
              Contact Me
            </Button>{' '}
            <span className="xl:text-xl">right now!</span>
          </p>
        </section>

        {/* my social media and etc */}
        <section className="px-8 xl:px-20 mt-32 mb-6 xl:mb-10">
          <div className="flex justify-between flex-col xl:flex-row gap-6 xl:gap-0">
            <h2 className="font-tusker-grotesk-medium text-[5.2rem] xl:text-[9rem] leading-[1.1] w-full">
              HOW TO<br />
              FIND ME
            </h2>

            <div className="flex content-end items-end xl:justify-end gap-x-4 gap-y-4 flex-wrap">
              {socialMedias.map((data) => (
                <Button
                  key={data.id}
                  href={data.url}
                  target="_blank"
                  secondary
                >
                  {data.title}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex justify-between flex-col xl:flex-row border-t border-t-zinc-800 py-5 xl:p-5 mt-12 xl:mt-16 gap-2">
            <address className="flex gap-4 items-center justify">
              <MdLocationOn className="text-xl xl:text-3xl" />

              <span className="not-italic text-sm xl:text-xl">
                Brantas street, Jombang, East Java, INA
              </span>
            </address>

            <a href="#" className="flex gap-4 items-center justify">
              <MdMail className="text-xl xl:text-3xl" />

              <span className="not-italic text-sm xl:text-xl">
                mattarannaufal@gmail.com
              </span>
            </a>

            <a href="#" className="flex gap-4 items-center justify">
              <MdCall className="text-xl xl:text-3xl" />

              <span className="not-italic text-sm xl:text-xl">
                (+62) 857 0707 1585
              </span>
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
