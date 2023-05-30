import { createGetKcContext } from "keycloakify/login";

export const { getKcContext } = createGetKcContext({
  mockData: [
    {
      pageId: "login.ftl",
      locale: {
        currentLanguageTag: "en",
      },
    },
    {
      pageId: "register-user-profile.ftl",
      locale: {
        currentLanguageTag: "en",
      },
      profile: {
        attributes: [
          {
            validators: {
              pattern: {
                pattern: "^[a-zA-Z0-9]+$",
                "ignore.empty.value": true,
                // eslint-disable-next-line no-template-curly-in-string
                "error-message": "${alphanumericalCharsOnly}",
              },
            },
            //NOTE: To override the default mock value
            value: undefined,
            name: "username",
          },
          {
            validators: {
              options: {
                options: [
                  "male",
                  "female",
                  "non-binary",
                  "transgender",
                  "intersex",
                  "non_communicated",
                ],
              },
            },
            // eslint-disable-next-line no-template-curly-in-string
            displayName: "${gender}",
            annotations: {},
            required: true,
            groupAnnotations: {},
            readOnly: false,
            name: "gender",
          },
        ],
      },
    },
  ],
});

export const { kcContext } = getKcContext({
  // Uncomment to test the login page for development.
  mockPageId: "login.ftl",
});

export type KcContext = NonNullable<
  ReturnType<typeof getKcContext>["kcContext"]
>;
