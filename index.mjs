const AMQP_USERNAME = process.env.AMQP_USERNAME || "root";
const AMQP_PASSWORD = process.env.AMQP_PASSWORD || "root";
const AMQP_HOST = process.env.AMQP_HOST || "localhost";
const AMQP_PORT = process.env.AMQP_PORT || 61616;
const AMQP_Q = process.env.AMQP_Q || "backend-event";

import * as handlers from "./lib/handlers.mjs";
import pkg from "rhea";

const { connect } = pkg;

const connection = connect({
  host: AMQP_HOST,
  port: AMQP_PORT,
  username: AMQP_USERNAME,
  password: AMQP_PASSWORD,
});

const receiver = connection.open_receiver(AMQP_Q);

receiver.on("message", function (context) {
  const event = JSON.parse(context.message.body.content);
  switch (event.eventName) {
    case "ExpenseReceived":
      handlers.handleExpenseReceived(event);
      break;
    case "ExpenseLabelUpdated":
      handlers.handleExpenseLabelUpdated(event);
      break;
    case "ExpensePriceUpdated":
      handlers.handleExpensePriceUpdated(event);
      break;
    case "ExpenseRemoved":
      handlers.handleExpenseRemoved(event);
      break;
    case "ExpenseAttachmentRemoved":
      handlers.handleExpenseAttachmentRemoved(event);
      break;
    case "InvoiceGenerated":
      handlers.handleInvoiceGenerated(event);
      break;
    case "InvoiceRemoved":
      handlers.handleInvoiceRemoved(event);
      break;
    case "InvoiceRestored":
      handlers.handleInvoiceRestored(event);
      break;
    case "DossierCreated":
      handlers.handleDossierCreated(event);
      break;
    case "ExpensesAddedToDossier":
      handlers.handleExpensesAddedToDossier(event);
      break;
    case "ExpenseRemovedFromDossier":
      handlers.handleExpenseRemovedFromDossier(event);
      break;
    case "InvoiceAddedToDossier":
      handlers.handleInvoiceAddedToDossier(event);
      break;
    case "InvoiceRemovedFromDossier":
      handlers.handleInvoiceRemovedFromDossier(event);
      break;
    case "DossierClosed":
      handlers.handleDossierClosed(event);
      break;
    case "DossierDeleted":
      handlers.handleDossierDeleted(event);
      break;
    case "DossierUpdated":
      handlers.handleDossierUpdated(event);
      break;
    case "DossierRecallForModification":
      handlers.handleDossierRecallForModification(event);
      break;
    default:
      console.error("unhandled event : ", event);
  }
});
