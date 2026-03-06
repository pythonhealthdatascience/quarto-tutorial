# Contributing

## `all-contributors`

If your name or contributions are missing from the README, or if you contributed in ways not captured by the current role emojis, please create an issue and use: 

```
@all-contributors please add @githubuser for ...
```

Then list appropriate contribution types from [allcontributors.org/docs/en/emoji-key](https://allcontributors.org/docs/en/emoji-key) (e.g., code, review, doc, content, bug, ideas, infra).

Alternatively, you can update it from the command line. This may be preferable, as the bot will create GitHub issues that email people when they are added.

You'll need to install the [All-Contributors CLI tool](https://allcontributors.org/cli/installation/):

```
npm i -D all-contributors-cli
```

When we first set-up all-contributors, we called:

```
npx all-contributors init
```

From then on, you can then run the following and select/enter relevant information when prompted:

```
npx all-contributors
```

If you want to remove specific contributions or people, edit the `.all-contributorsrc` file then run the following to regenerate the table in `README.md`. (Don't edit `README.md`, as it is just generated based on `.all-contributorsrc`).

```
npx all-contributors generate
```
