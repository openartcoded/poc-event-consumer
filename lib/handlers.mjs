import { downloadAndSave } from "./file.mjs";

export async function handleInvoiceGenerated(event) {
    console.log(`new invoice with number '${event.invoiceNumber}' has been generated. Saving invoice...`);
    const path = await downloadAndSave(event.uploadId);
    console.log(`invoice '${event.invoiceNumber}' saved at '${path}'`);
}

export async function handleExpenseReceived(event) {
    console.log('todo handleExpenseReceived');
}
export async function handleExpenseLabelUpdated(event) {
    console.log('todo handleExpenseLabelUpdated');
}
export async function handleExpensePriceUpdated(event) {
    console.log('todo handleExpensePriceUpdated');
}
export async function handleExpenseRemoved(event) {
    console.log('todo handleExpenseRemoved');
}
export async function handleExpenseAttachmentRemoved(event) {
    console.log('todo handleExpenseAttachmentRemoved');
}
export async function handleInvoiceRemoved(event) {
    console.log('todo handleInvoiceRemoved');
}
export async function handleInvoiceRestored(event) {
    console.log('todo handleInvoiceRestored');
}
export async function handleDossierCreated(event) {
    console.log('todo handleDossierCreated');
}
export async function handleExpensesAddedToDossier(event) {
    console.log('todo handleExpensesAddedToDossier');
}
export async function handleExpenseRemovedFromDossier(event) {
    console.log('todo handleExpenseRemovedFromDossier');
}
export async function handleInvoiceAddedToDossier(event) {
    console.log('todo handleInvoiceAddedToDossier');
}
export async function handleInvoiceRemovedFromDossier(event) {
    console.log('todo handleInvoiceRemovedFromDossier');
}
export async function handleDossierClosed(event) {
    console.log('todo handleDossierClosed');
}
export async function handleDossierDeleted(event) {
    console.log('todo handleDossierDeleted');
}
export async function handleDossierUpdated(event) {
    console.log('todo handleDossierUpdated');
}
export async function handleDossierRecallForModification(event) {
    console.log('todo handleDossierRecallForModification');
}