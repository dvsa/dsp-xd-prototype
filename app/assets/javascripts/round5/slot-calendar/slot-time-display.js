class SlotTimeDisplay {
  showTimeSlots(date, slots) {
    document.getElementById('dateHeading').scrollIntoView(true)

    this.updateDateHeading(date)
    document.getElementById('timesHelpInset').classList.add('govuk-visually-hidden')

    document.getElementById('times').classList.remove('govuk-visually-hidden')
    this.displaySlotsForDay(slots)
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

  displaySlotsForDay(slots) {
    const morningContainer = document.getElementById('morningTimes')
    morningContainer.innerHTML = ''

    const afternoonContainer = document.getElementById('afternoonTimes')
    afternoonContainer.innerHTML = ''

    this.buildTimeSlots(morningContainer, slots.am)
    this.buildTimeSlots(afternoonContainer, slots.pm)
  }

  buildTimeSlots(container, slots) {
    for (const slot of slots) {
      const timeSlot = document.createElement('div');
      timeSlot.classList.add('slot')
      timeSlot.innerHTML = `<span>${slot} | £23</span>`
      container.appendChild(timeSlot)

      timeSlot.addEventListener('click', () => {
        const selectedTimeSlots = document.getElementsByClassName('slot selected')
        if (selectedTimeSlots.length > 0) {
          selectedTimeSlots[0].classList.remove('selected')
        }

        timeSlot.classList.add('selected')
      })
    }
  }
}
