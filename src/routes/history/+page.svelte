<script>
  import { db } from "@/db";
  import DecisionList from "@/lib/components/DecisionList.svelte";
  import { Button } from "@/lib/components/ui/button";

  async function exportData() {
    try {
      const questions = await db.questions.toArray();
      // const treshold = await db.treshold.toArray();
      const data = {
        questions,
        // treshold: treshold[0].value,
      };
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "yes-no-data.json";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to export data:", error);
    }
  }
</script>

<div class="flex flex-col items-center gap-4 w-full">
  <h1 class="text-2xl font-bold">History</h1>

  <Button onclick={exportData}>Export my data</Button>

  <DecisionList numberOfQuestions={100} />
</div>
