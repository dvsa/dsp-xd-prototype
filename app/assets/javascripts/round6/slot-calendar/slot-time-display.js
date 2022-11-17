class SlotTimeDisplay {
  showTimeSlots(date, slots) {
    document.getElementById('dateHeading').scrollIntoView(true)

    this.updateDateHeading(date)
    document.getElementById('timesHelpInset').classList.add('govuk-visually-hidden')

    document.getElementById('times').classList.remove('govuk-visually-hidden')
    this.displaySlotsForDay(slots, date)
  }

  updateDateHeading(date) {
    const options = {
      weekday: 'long',
      year: 'numeric',
      day: 'numeric',
      month: 'long'
    }

    document.getElementById('dateHeading').innerText = date.toLocaleDateString('en-GB', options)
  }

  displaySlotsForDay(slots, date) {
    const morningContainer = document.getElementById('morningTimes')
    morningContainer.innerHTML = ''

    const afternoonContainer = document.getElementById('afternoonTimes')
    afternoonContainer.innerHTML = ''

    this.buildTimeSlots(morningContainer, slots.am, date)
    this.buildTimeSlots(afternoonContainer, slots.pm, date)
  }

  buildTimeSlots(container, slots, date) {
    for (const slot of slots) {
      const timeSlot = document.createElement('div');
      timeSlot.classList.add('slot')
      timeSlot.innerHTML = `<span>${slot.time} | ${slot.price}</span>`
      container.appendChild(timeSlot)

      timeSlot.addEventListener('click', () => {
        const selectedTimeSlots = document.getElementsByClassName('slot selected')
        const options = {  weekday: 'long', month: 'long', day: 'numeric' }
        var noTimeDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        document.getElementById("slot-date").value = noTimeDate.toLocaleDateString('en-GB', options);
        document.getElementById("slot-time").value = slot.time
        document.getElementById("slot-price").value = slot.price
        if (selectedTimeSlots.length > 0) {
          selectedTimeSlots[0].classList.remove('selected')
        }

        timeSlot.classList.add('selected')
      })
    }
  }
}
