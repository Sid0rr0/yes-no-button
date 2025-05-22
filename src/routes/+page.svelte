<div class="mt-2 w-full flex flex-col items-center">
  <span >Your last decision:</span>
  <DecisionList numberOfQuestions={1} />

  <div class="flex flex-col items-center gap-4 w-full my-4">
    <div class="flex gap-4 items-center">
      <label>
      Chances of YES:
      <input type="number" min="1" max="100" bind:value={percentage} onchange={() => updateTheshold()} class="p-1 border rounded text-center text-lg" />
      %
    </label>
    <Button variant="outline" onclick={() => resetTreshold()} class="cursor-pointer">Reset</Button>
    </div>
    <input type="range" min="1" max="100" class="w-10/12 sm:w-1/2" bind:value={percentage} onchange={() => updateTheshold()} />
  </div>

  <QuestionForm treshold={percentage} />
</div>

<script lang="ts">
  import QuestionForm from "$lib/components/QuestionForm.svelte"
  import { onMount } from 'svelte'
  import { db } from "@/db"
  import DecisionList from "@/lib/components/DecisionList.svelte"
  import Button from "@/lib/components/ui/button/button.svelte"
  
  const INITIAL_TRESHOLD = 0.5

  let treshold = $state(INITIAL_TRESHOLD)
  let percentage = $derived(treshold * 100)

  onMount(async () => {
    const tresholdValue = await db.treshold.toArray()

    if (tresholdValue.length > 0) {
      treshold = tresholdValue[0].value
    } else {
      treshold = INITIAL_TRESHOLD
      await db.treshold.add({
        id: 1,
        value: INITIAL_TRESHOLD,
      })
    }
  })

  async function resetTreshold() {
    treshold = INITIAL_TRESHOLD
    await db.treshold.update(1, { value: INITIAL_TRESHOLD })
  }

  async function updateTheshold() {
    await db.treshold.update(1, { value: percentage / 100 })
  }
</script>
