'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { MdLocationOn, MdMail } from 'react-icons/md';

import Button from '@/components/Button';

import sequenceAnimation from '@/utils/text-animation/sequence';
import wipeAnimation from '@/utils/text-animation/wipe';
import textSplitter from '@/utils/textSplitter';
import { socialMedias } from '@/utils/constant';

gsap.registerPlugin(useGSAP);

export default function SocialMedia() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // title animation
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      if (containerRef.current) {
        const splittedText = textSplitter('.title', containerRef.current, {
          types: 'chars,lines',
        });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.title',
              start: 'top 90%',
              end: 'top bottom',
              toggleActions: 'play none none reverse',
            },
          })
          .add(sequenceAnimation(splittedText, { from: 'top' }).play());
      }
    },
    {
      scope: containerRef,
      dependencies: [],
    },
  );

  // additional information animation
  useGSAP(
    () => {
      if (containerRef.current) {
        const addressText = textSplitter('.address', containerRef.current, {
          types: 'lines',
        });
        const emailText = textSplitter('.email', containerRef.current, {
          types: 'lines',
        });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.title',
              start: 'top center',
              end: 'top bottom',
              toggleActions: 'play none none reverse',
            },
          })
          .add(wipeAnimation(addressText).play())
          .add(wipeAnimation(emailText).play(), '<30%');
      }
    },
    {
      scope: containerRef,
      dependencies: [],
    },
  );

  return (
    <section className="mb-6 mt-32 px-8 md:mb-8 md:px-20" ref={containerRef}>
      <div className="flex flex-col justify-between gap-6 md:flex-row md:gap-0">
        <h2 className="title w-full font-tusker-grotesk-medium text-[5.2rem] leading-[1.1] *:pb-1 md:text-8xl lg:text-9xl xl:text-[9rem]">
          HOW TO
          <br />
          FIND ME
        </h2>

        <div className="flex flex-wrap content-end items-end gap-x-4 gap-y-4 md:justify-end">
          {socialMedias.map((data) => (
            <Button key={data.id} variant="secondary" asChild>
              <a href={data.url} target="_blank">
                {data.title}
              </a>
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-12 flex flex-col justify-between gap-2 border-t border-t-zinc-800 py-5 lg:mt-16 lg:flex-row">
        <address className="flex items-center gap-4">
          <MdLocationOn className="text-xl md:text-2xl xl:text-3xl" />

          <span className="address text-sm not-italic md:text-lg xl:text-xl">
            Brantas street, Jombang, East Java, INA
          </span>
        </address>

        <p className="flex items-center gap-4">
          <MdMail className="text-xl md:text-2xl xl:text-3xl" />

          <span className="email text-sm not-italic md:text-lg xl:text-xl">
            mattarannaufal@gmail.com
          </span>
        </p>
      </div>
    </section>
  );
}
