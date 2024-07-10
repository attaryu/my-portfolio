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
          <section className="pt-16 h-svh xl:h-dvh max-h-highest px-8 flex flex-col gap-10 md:px-20 sm:items-center">
            <h1 className="font-tusker-grotesk-medium text-7xl md:text-6xl leading-tight mt-auto">
              HELLO, <br className="sm:hidden" />
              I'M ATTAR
            </h1>

            <div className="w-full md:py-5 py-8 flex justify-between flex-col md:flex-row md:mt-auto md:items-center md:text-lg">
              <time dateTime={date.toISOString()}>{date.toLocaleString()}</time>
              <p>&copy;2024 All rights reserved.</p>
            </div>
          </section> 

          {/* about me */}
          <section className="h-screen max-h-highest grid place-items-center px-8">
            <p className="text-xl md:text-3xl md:text-center md:w-4/5 leading-relaxed">
              I'm 19 years old, with almost 3 years of in-depth experience in web development field. While I haven't stepped into the professional world yet, I've honed my skills through a variety of online courses, collaborative projects, solo projects, and even hackathons. Whether collaborating on a team or venturing solo, my ethos remains rooted in upholding best practices and ensuring precision.
            </p>
          </section>
        </div>

        {/* tech skill */}
        <section className="w-full py-14 md:py-32 overflow-hidden">
          <h2 className="font-neue-montreal-medium text-3xl md:text-5xl -rotate-1 px-8 md:px-20">
            Proudly presenting my expertise coupled with an understanding of the technology I use.
          </h2>

          <div className="my-16 md:my-20 relative -rotate-1 before:contents-[''] before:block before:w-1/4 before:xl:w-1/6 before:h-full before:absolute before:-left-1 before:bg-gradient-to-l before:from-transparent before:to-white before:pointer-events-none before:z-10 after:contents-[''] after:block after:w-1/4 after:xl:w-1/6 after:h-full after:absolute after:top-0 after:-right-1 after:bg-gradient-to-r after:from-transparent after:to-white after:pointer-events-none after:z-10">
            <div className="w-full overflow-x-auto">
              <ul
                className="w-full min-w-[750px] md:w-[120vw] h-56 md:h-72 xl:h-96 grid grid-rows-2 grid-cols-7 place-items-center gap-x-6 md:gap-x-8"
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

          <p className="mx-auto -rotate-1 px-8 sm:px-20 text-right text-sm md:text-xl leading-tight">
            <span className="md:w-3/4 md:inline-block">
              Even though I navigate a variety of technologies, mastery of certain technologies still eludes me; Nevertheless, I accepted the journey of rediscovering these tools in a short time.
            </span>
          </p>
        </section>

        {/* some word */}
        <section>
          <p className="w-full h-[150vh] md:h-[200vh] max-h-[1600px] grid place-items-center grid-rows-2">
            <span className="font-tusker-grotesk-semibold text-center text-6xl leading-snug">
              MAKE YOUR <br className="md:hidden" />
              DREAM WEBSITE...
            </span>

            <span className="font-tusker-grotesk-medium whitespace-nowrap text-6xl md:text-[8rem] xl:text-[14rem]">
              INTO A REALITY
            </span>
          </p>
        </section>

        {/* showcase selected project */}
        <section className="px-8 md:px-20 my-32">
          <h2 className="font-neue-montreal-medium text-4xl xl:text-6xl text-center">
            There are my <br className="md:hidden" />
            selected project
          </h2>

          <ul className="mt-14 space-y-8 md:space-y-12 lg:mt-20 lg:space-y-16">
            {projects.map((data) => (
              <li key={data.id} >
                <ProjectCard project={data} detailURL={data.detailURL} />
              </li>
            ))}
          </ul>
        </section>

        {/* offering project */}
        <section className="py-16 px-8 md:p-20 my-16 h-[80vh] md:h-[60vh] xl:h-screen max-h-highest relative flex flex-col overflow-hidden">
          <p className="text-[3.4rem] lg:text-[5rem] xl:text-[5.5rem] leading-none font-neue-montreal-medium">
            Don't you think about making a masterpiece together after seeing all that?
          </p>

          <img src="/ui_assets/wave-light.svg" alt="" className="absolute w-full right-1/3 md:left-0 md:w-full top-3/4 md:top-[55%] xl:top-1/2 scale-[2.7] md:scale-125 xl:scale-100 -rotate-5 md:rotate-0" />

          <p className="mt-auto self-end font-neue-montreal-medium flex gap-4 md:gap-8 items-center">
            <Button href="#" primary>
              Contact Me
            </Button>{' '}
            <span className="md:text-xl xl:text-2xl">right now!</span>
          </p>
        </section>

        {/* my social media and etc */}
        <section className="px-8 md:px-20 mt-32 mb-6 md:mb-8">
          <div className="flex justify-between flex-col md:flex-row gap-6 md:gap-0">
            <h2 className="font-tusker-grotesk-medium text-[5.2rem] md:text-8xl lg:text-9xl xl:text-[9rem] leading-[1.1] w-full">
              HOW TO<br />
              FIND ME
            </h2>

            <div className="flex content-end items-end md:justify-end gap-x-4 gap-y-4 flex-wrap">
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

          <div className="flex justify-between flex-col lg:flex-row border-t border-t-zinc-800 py-5 mt-12 lg:mt-16 gap-2">
            <address className="flex gap-4 items-center">
              <MdLocationOn className="text-xl md:text-2xl xl:text-3xl" />

              <span className="not-italic text-sm md:text-lg xl:text-xl">
                Brantas street, Jombang, East Java, INA
              </span>
            </address>

            <a href="#" className="flex gap-4 items-center">
              <MdMail className="text-xl md:text-2xl xl:text-3xl" />

              <span className="not-italic text-sm md:text-lg xl:text-xl">
                mattarannaufal@gmail.com
              </span>
            </a>

            <a href="#" className="flex gap-4 items-center">
              <MdCall className="text-xl md:text-2xl xl:text-3xl" />

              <span className="not-italic text-sm md:text-lg xl:text-xl">
                (+62) 857 0707 1585
              </span>
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
