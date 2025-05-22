<script lang="ts">
  import { db } from "@/db"
  import { liveQuery } from "dexie"

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
</script>

<div class="flex flex-col items-center gap-2 md:w-1/2 lg:w-1/3">
    <ul class="w-full">
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
            <span>{question.result <= question.treshold ? 'YES' : 'NO'}</span>
          </div>
        </li>
      {/each}
    </ul>
    <span class="self-end" >Total count: {$questionCount}</span>
  </div>
