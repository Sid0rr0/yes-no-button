<div class="mt-2 w-full">
  <div class="flex flex-col items-center gap-2 w-full px-8">
    <span>Last {NUMBER_OF_QUESTIONS} decisions (Total: {$questionCount})</span>
    <ul class="w-full md:w-1/2 lg:w-1/3">
      <li class="flex justify-between items-center p-2 border text-sm">
        <span class="text-sm">Question & Date</span>
        <div class="grid grid-cols-3 gap-4">
          <span>Treshold</span>
          <span>Result</span>
          <span>Decision</span>
        </div>
      </li>
      {#each $questions as question (question)}
        <li class="flex justify-between items-center p-2 border">
          <div class="flex flex-col">
            <span>{question.text}</span>
            <span class="text-sm">{new Date(question.date).toLocaleString()}</span>
          </div>
          <div class="grid grid-cols-3 gap-4">
            <span>{(question.treshold * 100).toFixed(2)}%</span>
            <span>{(question.result * 100).toFixed(2)}%</span>
            <span>{question.result >= question.treshold / 100 ? 'YES' : 'NO'}</span>
          </div>
        </li>
      {/each}
    </ul>
  </div>

  <div class="flex flex-col items-center gap-4 w-full my-4">
    <div>
      <label class="">
        Chance of YES:
        <input type="number" min="1" max="100" bind:value={percentage}  class="p-1 border rounded text-center text-lg" />
        %
      </label>
    </div>
    <input type="range" min="1" max="100" class="w-1/2" bind:value={percentage} />
  </div>

  <QuestionForm treshold={treshold} />
</div>

<script lang="ts">
  import QuestionForm from "$lib/components/QuestionForm.svelte"
  import { onMount } from 'svelte'
  import { db } from "@/db"
  import { liveQuery } from "dexie"
  const INITIAL_TRESHOLD = 0.5
  const NUMBER_OF_QUESTIONS = 2

  let questions = liveQuery(
    () => db.questions.reverse().limit(NUMBER_OF_QUESTIONS).toArray()
  )

  let questionCount = liveQuery(
    () => db.questions.count()
  )

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

</script>
