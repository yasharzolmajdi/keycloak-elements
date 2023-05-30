// ejected using 'npx eject-keycloak-page'
import { useState, FormEventHandler } from "react";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import type { KcContext } from "../kcContext";

import { Button } from "@qctrl/react-elements/Button";
import { Heading } from "@qctrl/react-elements/Heading";
import { Input } from "@qctrl/react-elements/Input";
import { Text } from "@qctrl/react-elements/Text";

export default function Login(props: {
  kcContext: Extract<KcContext, { pageId: "login.ftl" }>;
}) {
  const { kcContext } = props;

  const { url, usernameEditDisabled, login, realm, message } = kcContext;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();

    setIsLoginButtonDisabled(true);

    const formElement = e.target as HTMLFormElement;

    //NOTE: Even if we login with email Keycloak expect username and password in
    //the POST request.
    formElement
      .querySelector("input[name='email']")
      ?.setAttribute("name", "username");

    formElement.submit();
  });

  const label = !realm.loginWithEmailAllowed
    ? "username"
    : realm.registrationEmailAsUsername
    ? "email"
    : "usernameOrEmail";

  const autoCompleteHelper: typeof label =
    label === "usernameOrEmail" ? "username" : label;

  console.log(message);

  return (
    <div className="grid grid-cols-2 h-full">
      <form
        onSubmit={onSubmit}
        action={url.loginAction}
        method="post"
        className="mx-auto w-full max-w-md md:max-w-lg md:relative md:z-10 md:my-12 lg:mt-0 px-8 md:py-12 py-12 lg:pt-28 lg:pb-0 md:bg-white md:rounded-xl"
      >
        <Heading as="h1" variant="h3" className="mb-8">
          Login
        </Heading>
        <div className="flex flex-col space-y-5">
          <Input
            tabIndex={1}
            id={autoCompleteHelper}
            placeholder="Enter your email address"
            name={autoCompleteHelper}
            defaultValue={login.username ?? ""}
            type="text"
            size="lg"
          />
          <div>
            <Input
              tabIndex={2}
              id="password"
              name="password"
              type="password"
              autoComplete="off"
              placeholder="Enter your password"
              size="lg"
            />
            <a
              tabIndex={3}
              href={url.loginResetCredentialsUrl}
              className="mt-2 text-base md:text-sm font-medium text-violet-400 hover:text-primary"
            >
              Forgot your password?
            </a>
          </div>

          {realm.rememberMe && !usernameEditDisabled && (
            <input
              tabIndex={4}
              id="rememberMe"
              name="rememberMe"
              type="hidden"
              checked
            />
          )}

          <Button
            type="submit"
            tabIndex={5}
            name="login"
            id="kc-login"
            disabled={isLoginButtonDisabled}
            className="w-full"
            size="lg"
          >
            Sign In
          </Button>
        </div>

        <Text variant="body1" className="text-center mt-8">
          Don't have an account?{" "}
          <a
            tabIndex={6}
            href={url.registrationUrl}
            className="font-medium text-violet-400 hover:text-primary"
          >
            Sign up
          </a>
        </Text>
      </form>
      <div className="bg-violet-500 h-full w-full" />
    </div>
  );
}
