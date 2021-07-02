
/**
 * Callback for rendering the homepage card.
 * @return {CardService.Card} The card to show to the user.
 */
function onHomepage(e) {
  console.log(e);

  //message += ' ' + e.hostApp;
  return createCatCard("Select  An Event!!", true);
}

/**
 * Creates a card with an image of a cat, overlayed with the text.
 * @param {String} text The text to overlay on the image.
 * @param {Boolean} isHomepage True if the card created here is a homepage;
 *      false otherwise. Defaults to false.
 * @return {CardService.Card} The assembled card.
 */
function createCatCard(text, isHomepage, event) {
  // Explicitly set the value of isHomepage as false if null or undefined.
  if (!isHomepage) {
    isHomepage = false;
  }

  // Use the "Cat as a service" API to get the cat image. Add a "time" URL
  // parameter to act as a cache buster.
  var now = new Date();


  // Create a button that changes the cat image when pressed.
  // Note: Action parameter keys and values must be strings.
  var action = CardService.newAction()
    .setFunctionName('onChangeCat')
    .setParameters({ text: text, isHomepage: isHomepage.toString() });
  var button = CardService.newTextButton()
    .setText('Change cat')
    .setOnClickAction(action)
    .setTextButtonStyle(CardService.TextButtonStyle.FILLED);
  var buttonSet = CardService.newButtonSet()
    .addButton(button);




  var ss = SpreadsheetApp.openById("1HcFnf_bmZBJ608awJn-aybJlWmX1DfcQJLDW5l3-OII");
  var sheet = ss.getSheetByName("Sheet1");
  var clientList = sheet.getRange(2, 1, 3, 1).getDisplayValues();
  var categoryList = sheet.getRange(2, 2, 3, 1).getDisplayValues();
  var subCategoryList = sheet.getRange(2, 3, 3, 1).getDisplayValues();
  Logger.log(clientList);
  var clientDropDown = generateDropdown("Client", "Client", "", clientList);
  var categoryDropDown = generateDropdown("Category", "Category", "", categoryList);
  var subCategoryDropDown = generateDropdown("SubCategory", "Sub Category", "", subCategoryList);
  var billableHours = CardService.newSelectionInput()
        .setType(CardService.SelectionInputType.CHECK_BOX)
        .setFieldName("checkbox_field")
        .addItem("Billable Hours", "billable", false)
  // Assemble the widgets and return the card. 
  var decoratedText = CardService.newDecoratedText()
    .setText("Select An Event!")
  var section;
  if (!event) {
    section = CardService.newCardSection().addWidget(decoratedText);
  }
  else {

    section = CardService.newCardSection().addWidget(clientDropDown)
      .addWidget(categoryDropDown)
      .addWidget(subCategoryDropDown)
      .addWidget(billableHours)
        .addWidget(CardService.newTextButton()
          .setText("Add to Description")
          .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
          .setOnClickAction(CardService.newAction().setFunctionName('setDescription').setParameters({
            eventId: event.getId(), calendarId: event.getOriginalCalendarId()
          })));
  }
  var card = CardService.newCardBuilder()

    .addSection(section);
  if (!isHomepage) {
    // Create the header shown when the card is minimized,
    // but only when this card is a contextual card. Peek headers
    // are never used by non-contexual cards like homepages.
    var peekHeader = CardService.newCardHeader()
      .setTitle(event.getTitle())
      .setImageUrl('https://www.gstatic.com/images/icons/material/system/1x/pets_black_48dp.png')
      .setSubtitle(text);
    card.setPeekCardHeader(peekHeader)
  }

  return card.build();
}

function setDescription(e) {
  // console.log("e", e);
  // console.log("client:", e.formInput.Client);
  //return e.parameters.eventId;
  var calendarId = e.parameters.calendarId;
  var eventId = e.parameters.eventId;
  var calendar = CalendarApp.getCalendarById(calendarId);
  var event = calendar.getEventById(eventId);
  event.setDescription(e.formInput.Client + "-" + e.formInput.Category + "-" + e.formInput.SubCategory + "-" +( e.formInput.checkbox_field == "billable" ? "true" : "false"));


  return createCatCard("Event Descrription change!", true)//e.formInput.Client;

  var eventId = "1lpcejvidf4lqgcmvr4f4b8uhn@google.com";
  var calendarIdd = "c_g8rcvtcqbvqb83k1amqamddo50@group.calendar.google.com";
  Logger.log(CalendarApp.getCalendarById(calendarIdd).getEventById(eventId));
  var event = CalendarApp.getEventSeriesById(eventId);
  Logger.log(event.getId());
  event.setDescription("Setted descriptioon");
}
function generateDropdown(fieldName, fieldTitle, previousSelected, items = []) {
  var selectionInput = CardService.newSelectionInput().setTitle(fieldTitle)
    .setFieldName(fieldName)
    .setType(CardService.SelectionInputType.DROPDOWN);

  items.forEach((item, index) => {
    selectionInput.addItem(item[0], item[0], item[0] == previousSelected);
  })

  return selectionInput;
}
