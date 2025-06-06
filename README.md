# YES/NO button

This is a simple decision-making app that helps you make choices by providing a random yes or no answer. You can also keep track of your decisions and their outcomes. Made for people, who have a hard time making decisions.

The data is stored locally in your browser using IndexedDB and service workers, so you can
access it even when you're offline.

## TODO

- [ ] Confirm delete data
- [x] Mute sound button
- [ ] PWA
- [ ] Statistics from the data

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
