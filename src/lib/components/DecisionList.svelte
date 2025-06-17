<script lang="ts">
  import { db } from "@/db"
  import { liveQuery } from "dexie"
  import { Switch } from "$lib/components/ui/switch"

  interface Props {
		numberOfQuestions: number;
	}

  let { numberOfQuestions }: Props = $props()

  let questions = liveQuery(
    () => db.questions.reverse().limit(numberOfQuestions).toArray()
  )

  let questionCount = liveQuery(
    () => db.questions.count()
  )

  async function updateQuestion(id: number, value: boolean) {
    await db.questions.update(id, { followedThrough: value })
  }
</script>

<div class="flex flex-col items-center gap-2 md:w-1/2 lg:w-1/3">
  <div class="flex justify-between items-center w-full">
    <span>{numberOfQuestions > 1 ? `Your last ${numberOfQuestions} decisions:` : "Your last decision:"}</span>
    <span class="self-end" >Total count: {$questionCount}</span>
  </div>
  <ul class="w-full">
    <li class="flex justify-between items-center p-2 border text-sm">
      <div class="flex gap-6 items-center">
        {#if numberOfQuestions > 1 } <span class="text-sm">#</span> {/if}
        <span class="text-sm">Question & Date</span>
      </div>
      <div class="grid grid-cols-4 gap-4">
        <span>Treshold</span>
        <span>Result</span>
        <span>Decision</span>
        <span>Done</span>
      </div>
    </li>
    {#each $questions as question (question.date)}
      <li class="flex justify-between items-center p-2 border">
        <div class="flex gap-4 items-center">
          {#if numberOfQuestions > 1 } <span class="text-lg">#{question.id}</span> {/if}
          <div class="flex flex-col justify-center">
            <strong>{question.text}</strong>
            <span class="text-sm">{new Date(question.date).toLocaleString()}</span>
          </div>
        </div>
        <div class="grid grid-cols-4 gap-4 text-center">
          <span>{(question.treshold * 100).toFixed(2)}%</span>
          <span>{(question.result * 100).toFixed(2)}%</span>
          {#if question.result <= question.treshold}
            <b class="text-green-600">YES</b>
          {:else}
            <b class="text-red-500">NO</b>
          {/if}
          <Switch bind:checked={question.followedThrough} onCheckedChange={() => updateQuestion(question.id, !question.followedThrough)} />
        </div>
      </li>
    {/each}
  </ul>
</div>
