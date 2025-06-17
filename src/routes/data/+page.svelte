<script>
  import { db } from "@/db";
  import DecisionList from "@/lib/components/DecisionList.svelte"
  import { Button } from "@/lib/components/ui/button"
  import Trash2 from "@lucide/svelte/icons/trash-2"
  import FileDown from "@lucide/svelte/icons/file-down"

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

  async function deleteData() {
    try {
      await db.questions.clear();
      // await db.treshold.clear();
      console.log("Data deleted successfully");
    } catch (error) {
      console.error("Failed to delete data:", error);
    }
  }
</script>

<div class="flex flex-col items-center gap-4 w-full">
  <h1 class="text-2xl font-bold">History</h1>

  <div class="flex flex-col md:flex-row gap-2">
    <!-- TODO confirm -->
    <Button onclick={deleteData} class="cursor-pointer bg-red-500 flex gap-2">Delete my data <Trash2 /></Button>
    <Button onclick={exportData} class="cursor-pointer flex gap-2">Export my data <FileDown /></Button>
  </div>

  <DecisionList numberOfQuestions={100} />
</div>
