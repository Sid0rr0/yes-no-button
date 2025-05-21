<script>
  import { db } from "@/db"
  import { Input } from "$lib/components/ui/input"
  import { Button } from "$lib/components/ui/button"
  import RedButton from "$lib/components/RedButton.svelte"

  let props = $props()

  // let status = $state("")
  let questionText = $state("")
  let result = $state(-1)


// let percentageText = $derived((result*100).toFixed(2)+"%")
let text = $derived(result >= props.treshold / 100 ? 'YES' : 'NO')

  async function addQuestion() {
    try {
      await db.questions.add({
        text: questionText,
        treshold: props.treshold / 100,
        result,
        date: new Date().toISOString(),
      });

      // status = `Question ${questionText} successfully added.`;
    } catch (error) {
      // status = `Failed to add ${questionText}: ${error}`;
      console.error("Failed to add question:", error);
    }
  }

  function getRandom() {
    result = Math.random()
    addQuestion()
  }

  function clearText() {
    questionText = ""
  }
</script>
<div class="flex flex-col items-center justify-center">
  <!-- <p>{status}</p> -->
  <fieldset>
    <!-- <legend>Add info about the decision</legend> -->
    <div class="flex flex-col sm:flex-row gap-4 items-end">
      <label class="flex flex-col gap-2">
        <span class="md:text-xl" >What are you deciding about?</span>
        <Input
            type="text"
            class="dark:bg-foreground dark:text-background"
            bind:value={questionText} />
      </label>

      <Button variant="outline" class="cursor-pointer" onclick={clearText}>Clear Text</Button>
    </div>

    <RedButton onclick={getRandom} />
  </fieldset>

  {#if result >= 0}
    <div class="flex flex-col items-center my-4">
      <span class="text-2xl font-bold">{text}</span>
      <!-- <span>Percentage: {percentageText}</span> -->
    </div>
  {/if}
</div>