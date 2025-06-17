<script lang="ts">
  import { Button } from "@/lib/components/ui/button"
  import { onMount } from 'svelte'

  interface BeforeInstallPromptEvent extends Event {
    readonly platforms: Array<string>;
    readonly userChoice: Promise<{
      outcome: 'accepted' | 'dismissed';
      platform: string;
    }>;
    prompt(): Promise<void>;
  }

  onMount(() => {
    // TODO - beforeinstallprompt fires before onMount
    let installPrompt: BeforeInstallPromptEvent | null = null
    const installButton = document.querySelector("#install")

    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault()
      installPrompt = event as BeforeInstallPromptEvent
      installButton!.removeAttribute("hidden")
    })

    installButton!.addEventListener("click", async () => {
      if (!installPrompt) {
        return;
      }

      await installPrompt.prompt();
      const userChoice = await installPrompt.userChoice;
      console.log(`Install prompt was: ${userChoice.outcome}`);
      disableInAppInstallPrompt();
    });

    function disableInAppInstallPrompt() {
      installPrompt = null;
      installButton!.setAttribute("hidden", "");
    }

    window.addEventListener("appinstalled", () => {
      disableInAppInstallPrompt();
    });
  })
</script>

<div class="flex flex-col items-center gap-4 max-w-xl pb-8">
  <h1 class="text-2xl font-bold">About</h1>

  <p>
    This is a simple decision-making app that helps you make choices by
    providing a random yes or no answer. You can also keep track of your
    decisions and their outcomes. Made for people, who have a hard time making decisions.
  </p>

  <h2 class="text-xl font-bold">Technical details</h2>
  <p>
    Your data is stored locally in your browser using IndexedDB and service workers, so you can
    access it even when you're offline. Also you can install this app on your device and use it as a PWA (Progressive Web App).
  </p>

  <p>
    The app is built with Svelte and SvelteKit. 
    It uses the Dexie.js library for managing IndexedDB, making it easy to
    store and retrieve your decisions. The app is designed to be simple and
    user-friendly, with a clean interface that allows you to focus on making
    decisions.
  </p>

  <Button id="install" hidden>Install this app</Button>

  <h2 class="text-xl font-bold">Links</h2>
  <div class="flex gap-4">
    <a href="https://github.com/Sid0rr0/yes-no-button" target="_blank">GitHub Repository</a>
    <span>
      About me: <a href="https://www.hungstuff.online/" target="_blank">HungStuff.online</a>
    </span>
  </div>
</div>
