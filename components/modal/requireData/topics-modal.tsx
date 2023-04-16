"use client";
import cn from "clsx";
import { auth } from "@/lib/firebase/app";
import { motion } from "framer-motion";
import { HeroIcon } from "@/components/ui/hero-icon";
import { useScroll } from "@/lib/hooks/useScroll";
import { useState } from "react";
import { TitleForm } from "@/components/ui/modal/title-modal";
import { CustomIcon } from "@/components/ui/custom-icons";
import { ParagraphModal } from "@/components/ui/modal/paragaph-modal";
import { useRequireData } from "@/lib/context/require-data-context";
import { ButtonHighlight } from "@/components/ui/modal/buttons-modal";
import { onAuthStateChanged } from "firebase/auth";
import { capitalizeFirstChar } from "@/lib/utils";
import { topics as topicsName, topicsAndSub } from "@/lib/data/user";

import type { Variants } from "framer-motion";
import type { ComponentModalProps } from "./require-data-modal";

const variants: Variants = {
  initial: { opacity: 0, scale: 0.5, display: "none" },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", duration: 0.4, delay: 0.1, bounce: 0.6 },
    display: "block",
  },
  exit: {
    scale: 0.5,
    transition: { opacity: 0, duration: 0.15 },
    transitionEnd: {
      display: "none",
    },
  },
};

const variantsSpan: Variants = {
  initial: { opacity: 0, transform: "translateX(-100%)" },
  animate: {
    opacity: 1,
    transform: "translateX(0%)",
    transition: { type: "spring", duration: 1 },
  },
  exit: {
    transition: { opacity: 0, x: 0, duration: 0.15 },
  },
};

type TopicsAndSub = typeof topicsAndSub[number];
type TopicsProps<T extends TopicsAndSub> = Array<{
  [K in keyof T]: K extends "sub" ? Array<T[K][number]> : T[K];
}>;

export const TopicsModal = (props: ComponentModalProps): JSX.Element => {
  const { nextSlide } = props;
  const [topics, setTopics] = useState<TopicsProps<TopicsAndSub>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSubSlide, setIsSubSlide] = useState<boolean>(false);

  const { scrollProps, scrollTop, clientHeight, scrollHeight, isScrollable } =
    useScroll();

  const opacityShadowTop =
    scrollHeight && clientHeight && isScrollable
      ? scrollTop / (scrollHeight - clientHeight)
      : 0;

  const opacityShadowBottom =
    scrollHeight && clientHeight && isScrollable
      ? 1 - scrollTop / (scrollHeight - clientHeight)
      : 0;

  const { setError } = useRequireData();

  const fillTopics = () => {
    onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const uid = user.uid;
          setLoading(true);
          // await updateUserBirthdate(uid, birthdate);
          setLoading(false);
          await nextSlide();
        }
      } catch (error) {
        setError(true);
      }
    });
  };

  const topicHandler = (topic: TopicsAndSub["topic"]): void => {
    const newTopics = [...topics];
    const index = newTopics.findIndex((item) => item.topic == topic);

    if (index >= 0) {
      newTopics.splice(index, 1);
      setTopics(newTopics);
    } else {
      setTopics((prev) => [...prev, { topic, sub: [] }]);
    }
  };

  function renderComponentBaseOnIsSubSlide() {
    return !isSubSlide ? (
      <>
        <div className="h-full max-h-[575px] relative z-0">
          <div
            {...scrollProps}
            className={cn(
              `h-full max-h-[inherit] xs:max-h-[475px] overflow-y-auto scrollbar-w-1 scrollbar-thumb-accent-blue hover:scrollbar-thumb-accent-blue/80 scrollbar-track-main-background-3 scrollbar-thin px-10 xs:px-16 relative bg-main-background-1`
            )}
          >
            <div className="flex flex-col mb-6 z-0">
              <TitleForm title={"What do you want to see in Twitter?"} />
              <ParagraphModal
                text={
                  "Select at least 3 interest to pesonalize you Twitter experience. They will be visible on your profile."
                }
                className="text-base"
              />
            </div>
            <div className="grid grid-cols-2 xs:grid-cols-3 gap-3 min-h-[575px] w-full pb-10">
              {topicsName.map((topic) => {
                const exist = topics.find((item) => item.topic === topic);
                return (
                  <div
                    key={topic}
                    className={`aspect-w-1 aspect-h-1 overflow-hidden transition-colors duration-200 border border-light-border rounded-lg cursor-pointer relative ${
                      exist
                        ? "bg-accent-blue !border-accent-blue text-white active:opacity-80 transition-opacity"
                        : "bg-main-background-1 active:bg-main-background-1 hover:bg-accent-blue/20"
                    }`}
                    onClick={() => topicHandler(topic)}
                  >
                    {exist && (
                      <motion.div
                        {...variants}
                        className="!absolute h-6 w-6 z-10 left-auto bottom-auto right-2 top-2"
                      >
                        <HeroIcon
                          className="h-[inherit] w-[inherit] text-white"
                          iconName="CheckCircleIcon"
                          solid
                        />
                      </motion.div>
                    )}
                    <div className="p-2 flex items-end">
                      <span className="font-bold">
                        {capitalizeFirstChar(topic)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            id="shadow-top-topics"
            className={cn(
              `z-10 absolute top-0 h-5 bg-gradient-to-b from-black/10 dark:from-white to-transparent`,
              isScrollable ? "w-[calc(100%_-_.5rem)]" : "w-full"
            )}
            style={{ opacity: opacityShadowTop }}
          />
          <div
            id="shadow-bottom-topics"
            className={cn(
              `z-10 absolute bottom-0 w-full h-5 bg-gradient-to-t from-black/10 dark:from-white to-transparent`,
              isScrollable ? "w-[calc(100%_-_.5rem)]" : "w-full"
            )}
            style={{ opacity: opacityShadowBottom }}
          />
        </div>
        <div className="h-[100px] px-5 xs:px-12 flex items-center bg-main-background-1 xs:rounded-b-2xl">
          <div className="flex-1 overflow-hidden">
            {topics.length >= 3 && (
              <motion.div
                {...variantsSpan}
                className="font-semibold inline-block"
              >
                Great work 🎉
              </motion.div>
            )}
            {topics.length < 3 && (
              <motion.div
                {...variantsSpan}
                className="font-semibold inline-block"
              >
                {topics.length} of 3 selected
              </motion.div>
            )}
          </div>
          <ButtonHighlight
            disabled={topics.length < 3}
            loading={loading}
            callback={() => {
              if (!isSubSlide) setIsSubSlide(true);
            }}
            text="Next"
            className="text-lg max-w-[100px] p-2"
          />
        </div>
      </>
    ) : (
      <>
        <div
          className={`h-full max-h-[575px] xs:max-h-[475px] overflow-y-auto overflow-x-hidden scrollbar-thumb-accent-blue scrollbar-track-main-background-3 scrollbar-thin px-10 xs:px-16 `}
        >
          <div className="w-full h-full">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            ab magnam ipsa libero mollitia voluptate ipsum esse reprehenderit
            minus laboriosam? Aliquid, obcaecati. Eveniet est temporibus minus
            eligendi facilis labore fugiat voluptatem voluptate nisi at, dolor
            laboriosam ipsum natus assumenda cumque eius, sed earum! Obcaecati
            ad error rem molestias eum. Incidunt ut consectetur ea fugiat. Rem
            dolores nobis illo. Molestias numquam culpa molestiae mollitia cum
            vel earum quaerat repellat, iusto placeat animi dignissimos
            asperiores, adipisci, inventore modi cupiditate enim. Ipsum fugit et
            quas vitae beatae, minima, deserunt sed cum harum, exercitationem
            laudantium impedit a nesciunt ratione similique natus numquam.
            Aspernatur cum odit deleniti commodi accusantium esse id repellendus
            consequatur quaerat similique, ex dolorem pariatur impedit est vero
            animi eos dignissimos sit. Dolores harum laboriosam quaerat dolorum
            tenetur ratione autem rerum explicabo nemo nihil adipisci
            repellendus eius voluptatibus, in inventore maxime natus vel beatae
            ex sed voluptates provident magnam? Explicabo in iusto quaerat
            debitis autem doloribus incidunt recusandae error, eius maiores
            dolorum atque ipsum sunt, eligendi deleniti. Fugiat quas earum quia,
            quos atque accusantium ratione, distinctio, quasi quis officia esse
            assumenda natus aut! Molestias, debitis qui! Quibusdam animi iure
            ducimus consequatur fugit, dolorem molestias voluptate obcaecati
            commodi numquam. Atque voluptate tenetur voluptas, doloribus vitae
            nihil maiores laboriosam repudiandae rem fugiat. Placeat numquam
            veritatis architecto earum consequuntur repellat illo accusantium
            nesciunt ab corrupti tempore officia, consequatur minus vel dolores
            commodi. Quod voluptatem laboriosam totam dicta quibusdam quis
            maxime aliquam reprehenderit repellat iure mollitia officia, labore,
            velit omnis exercitationem. Facere, officiis iste? Quas quos ullam
            praesentium commodi obcaecati quam eaque quidem quibusdam sequi
            itaque? Sed porro, iure, id ullam nostrum, aliquid ex quia rerum
            neque veritatis dolor quod rem voluptates. Voluptatum provident
            minima velit! Nobis, commodi dolores, nam inventore ab optio
            consectetur modi id quibusdam perferendis ipsa, voluptate expedita
            officiis fugiat aperiam. Odit, officiis. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Optio voluptatibus animi cumque at
            sequi eveniet. Veritatis voluptas odit sapiente consequuntur dolore
            nisi facilis cupiditate ut commodi eius adipisci temporibus tempora
            impedit vero magni mollitia doloribus expedita, voluptatum, tempore
            similique magnam reiciendis. Minima repellat dolor expedita
            voluptatem fuga in pariatur velit nisi, nihil quisquam consequatur
            ut provident maxime. Quis est eius iusto dolorum corrupti aliquam a
            necessitatibus ullam praesentium perspiciatis nostrum facilis ab,
            quaerat libero facere magnam officia maiores non cum. Placeat esse
            ipsam veniam, iste recusandae ut ipsa expedita, omnis dolorum ullam
            cupiditate sint animi veritatis voluptas et nemo incidunt.
          </div>
        </div>
        <div className="h-[100px] px-5 xs:px-12 flex items-center bg-main-background-1 xs:rounded-b-2xl">
          <ButtonHighlight
            disabled={topics.length < 3}
            loading={loading}
            callback={fillTopics}
            text="Next"
            className="text-lg p-2"
          />
        </div>
      </>
    );
  }

  return (
    <>
      <CustomIcon
        className="w-8 h-8 text-accent-blue mx-auto absolute top-5 left-1/2 -translate-x-1/2 "
        iconName="TwitterIcon"
      />
      <div className="pt-[75px] h-full xs:min-h-[inherit] w-full flex flex-col">
        {renderComponentBaseOnIsSubSlide()}
      </div>
    </>
  );
};
