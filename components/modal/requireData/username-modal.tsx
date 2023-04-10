"use client";
import cn from "clsx";
import { auth } from "@/lib/firebase/app";
import { motion } from "framer-motion";
import { Loading } from "@/components/ui/loading";
import { HeroIcon } from "@/components/ui/hero-icon";
import { debounce } from "lodash";
import { InputText } from "@/components/ui/modal/input-modal";
import { TitleForm } from "@/components/ui/modal/title-modal";
import { ParagraphModal } from "@/components/ui/modal/paragaph-modal";
import { CustomIcon } from "@/components/ui/custom-icons";
import { doc, getDoc } from "firebase/firestore";
import { getRandomInt } from "@/lib/random";
import { useRequireData } from "@/lib/context/require-data-context";
import { usersCollection } from "@/lib/firebase/collections";
import { ButtonHighlight } from "@/components/ui/modal/buttons-modal";
import { onAuthStateChanged } from "firebase/auth";
import { ComponentModalProps } from "./require-data-modal";
import { generateStringAndNumber } from "@/lib/utils";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  MutableRefObject,
} from "react";
import {
  updateUsername,
  checkUsernameAvailability,
} from "@/lib/firebase/utils";

import type { User } from "firebase/auth";
import type { Variants } from "framer-motion";

const variants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", duration: 0.5 },
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } },
};

export const UsernameModal = (props: ComponentModalProps): JSX.Element => {
  const { nextSlide } = props;
  const { setError } = useRequireData();

  const [username, setUsername] = useState<string>("");
  const [usernames, setUsernames] = useState<string[]>([]);
  const [errorUsername, setErrorUsername] = useState<string | null>(null);

  const initialUsername: MutableRefObject<null | string> = useRef(null);
  const [loadInitial, setLoadInitial] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [availability, setAvailability] = useState(false);

  const maxUsername = 15;
  const minUsername = 5;
  const condition1 = username.length >= minUsername;
  const condition2 = username.length <= maxUsername;
  const condition3 = /^[a-zA-Z0-9_]+$/.test(username);
  const condition = condition1 && condition2 && condition3;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedCheckUsernameAvailability = useCallback(
    debounce((username) => {
      checkUsernameAvailability(username)
        .then((res) => {
          if (!res) {
            if (initialUsername.current !== username) {
              setErrorUsername(
                "That username has been taken. Please choose another."
              );
            }
          }
        })
        .finally(() => setLoading(false));
    }, 300),
    []
  );

  useEffect(() => {
    setErrorUsername(null);

    if (!condition1) {
      setErrorUsername("Your username must be longer than 4 characters.");
      return;
    } else if (!condition2) {
      setErrorUsername("Your username must be shorter than 15 characters.");
      return;
    } else if (!condition3) {
      setErrorUsername(
        "Your username can only contain letters, numbers and '_'."
      );
      return;
    }
    if (condition) {
      setLoading(true);
      debouncedCheckUsernameAvailability(username);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  useEffect(() => {
    if (errorUsername && initialUsername.current !== username && !loadInitial) {
      setAvailability(true);
    } else {
      setAvailability(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorUsername, initialUsername.current, loadInitial]);

  useEffect(() => {
    const fetchInitialUsername = (): void => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid;
          setLoadInitial(true);

          getDoc(doc(usersCollection, uid))
            .then((res) => {
              if (res.exists()) {
                const { username } = res.data();
                setUsername(username);
                initialUsername.current = username;
                setLoadInitial(false);
              }
            })
            .finally(() => {
              setLoadInitial(false);
            });
        }
      });
    };
    fetchInitialUsername();
  }, []);

  useEffect(() => {
    const fetchUsernames = async (authUser: User | null): Promise<void> => {
      if (authUser) {
        const { displayName } = authUser;
        let amountUsername = 3;
        let amountTry = 100;
        let randomUsername = "";

        const normalizeName = displayName?.replace(/\s/g, "").toLowerCase();
        const availabilityUsernamesArray: string[] = [];

        while (amountUsername > 0 && amountTry > 0) {
          amountTry = amountTry - 1;

          const randomInt = getRandomInt(1, 99999);

          randomUsername = generateStringAndNumber(
            normalizeName ?? "",
            randomInt,
            maxUsername
          );

          const usernameAvailability = await checkUsernameAvailability(
            randomUsername
          );

          if (usernameAvailability) {
            availabilityUsernamesArray.push(randomUsername);
            amountUsername = amountUsername - 1;
          }
        }
        setUsernames(availabilityUsernamesArray);
      }
    };
    onAuthStateChanged(auth, fetchUsernames);
  }, []);

  const fillUsername = (): void => {
    if (initialUsername.current == username) {
      nextSlide();
      return;
    } else {
      onAuthStateChanged(auth, async (user) => {
        try {
          if (user) {
            const uid = user.uid;
            setLoading(true);
            await updateUsername(uid, username);
            setLoading(false);
            await nextSlide();
          }
        } catch (error) {
          setError(true);
        }
      });
    }
  };

  return (
    <>
      <CustomIcon
        className="w-8 h-8 text-accent-blue mx-auto absolute top-5 left-1/2 -translate-x-1/2 "
        iconName="TwitterIcon"
      />
      <div className="py-14 px-5 xs:px-14 w-full min-h-[624px] flex flex-col justify-between gap-3">
        <div className="flex flex-col w-full gap-6 items-start">
          <div>
            <TitleForm title={"What should we call you?"} />
            <ParagraphModal
              text={"Your @username is unique. You can always change it later."}
              className="text-base"
            />
          </div>
          <div className="relative w-full mb-5">
            <InputText
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              classNameInput={cn(
                "pl-7 pr-8",
                availability && "focus:!border-accent-red !border-accent-red"
              )}
              disabled={loadInitial}
            />
            {availability && (
              <p className="text-sm text-accent-red absolute -bottom-5 left-2">
                {errorUsername}
              </p>
            )}

            {loadInitial ? (
              <>
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                  <Loading iconClassName="h-5 w-5 !text-accent-blue" />
                </div>
              </>
            ) : (
              <>
                <span className="absolute text-light-secondary text-xl top-1/2 -translate-y-1/2 left-2 dark:text-light-line-reply pt-4">
                  @
                </span>
                <label
                  className={cn(
                    "pointer-events-none text-light-secondary dark:text-light-line-reply absolute text-sm top-2 left-2 mb-0 max-w-[90%] origin-[0_0] truncate transition-all duration-200 ease-out motion-reduce:transition-none"
                  )}
                >
                  Username
                </label>

                {!availability && (
                  <motion.div
                    {...variants}
                    className="absolute bottom-3 right-2"
                  >
                    <HeroIcon
                      iconName="CheckCircleIcon"
                      solid
                      className="h-5 w-5 text-accent-green"
                    />
                  </motion.div>
                )}

                {availability && (
                  <motion.div
                    {...variants}
                    className="absolute bottom-3 right-2"
                  >
                    <HeroIcon
                      iconName="XCircleIcon"
                      solid
                      className="h-5 w-5 text-accent-red"
                    />
                  </motion.div>
                )}
              </>
            )}
          </div>
          {usernames.length != 0 && (
            <div>
              {usernames.map((username, index) => {
                return (
                  <span
                    key={username}
                    className="span-link cursor-pointer"
                    onClick={() => {
                      setUsername(username);
                      setUsernames((prev) => {
                        const remainAvailabilityUsername = prev.filter(
                          (name) => name !== username
                        );
                        return [...remainAvailabilityUsername];
                      });
                    }}
                  >
                    @{username}
                    {index !== usernames.length - 1 && ", "}
                  </span>
                );
              })}
            </div>
          )}

          <a
            className="span-link inline"
            target="_blank"
            href="https://help.twitter.com/en/managing-your-account/help-with-common-username-issues"
          >
            Show More
          </a>
        </div>
        <ButtonHighlight
          disabled={availability}
          loading={loading || loadInitial}
          callback={fillUsername}
          text="Next"
          className="py-3 text-lg"
        />
      </div>
    </>
  );
};
