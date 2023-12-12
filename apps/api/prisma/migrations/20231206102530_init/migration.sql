-- DropForeignKey
ALTER TABLE "TodoItem" DROP CONSTRAINT "TodoItem_todoId_fkey";

-- AddForeignKey
ALTER TABLE "TodoItem" ADD CONSTRAINT "TodoItem_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
