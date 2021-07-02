/**
 * 1RR5g5JPmehsSCjaiBHOhFPwP_KfAlYP4ewzvfXePCyA
 * Callback for rendering the card for a specific Calendar event.
 * @param {Object} e The event object.
 * @return {CardService.Card} The card to show to the user.
 */
function onCalendarEventOpen(e) {
  console.log(e);
  var calendar = CalendarApp.getCalendarById(e.calendar.calendarId);
  

  // The event metadata doesn't include the event's title, so using the
  // calendar.readonly scope and fetching the event by it's ID.
  var event = calendar.getEventById(e.calendar.id);
  if (!event) {
    // This is a new event still being created.
    return createCatCard('A new event!', true);
  }
  var title = event.getTitle();
  return createCatCard(title, false , event);
}
