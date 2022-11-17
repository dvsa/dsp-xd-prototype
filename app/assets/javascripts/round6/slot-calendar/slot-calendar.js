class SlotCalendar {
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  calendarMonth = new Date()

  constructor(slots, dateChangedCallback) {
    this.slots = slots
    this.dateChangedCallback = dateChangedCallback
    this.calendar = document.getElementById('calendar')

    document.getElementById('previousMonth').addEventListener('click', () => this.previousMonth())
    document.getElementById('nextMonth').addEventListener('click', () => this.nextMonth())
  }

  buildCalendar() {
    this.updateMonthDisplay()
    if (this.calendarMonth.getMonth() === 9) {
      const img = document.createElement('img')
      img.src = '/public/images/round6/no_slots_available.png';
      img.style = 'width:770px; height:750px;'
      this.calendar.innerHTML = ''
      this.calendar.appendChild(img)
    } else {
      const firstOfMonth = new Date(this.calendarMonth.getFullYear(), this.calendarMonth.getMonth(), 1)
      this.calendar.innerHTML = ''
      this.appendStartOfMonthPadding(firstOfMonth);
      this.appendMonthDays(firstOfMonth);
    }
  }

  updateMonthDisplay() {
    document.getElementById('monthDisplay').innerText = this.getHeaderMonthAndYear(this.calendarMonth)
  }

  appendStartOfMonthPadding(date) {
    for (let i = 0; i < this.getDayOfWeek(date); i++) {
      const paddingElement = document.createElement('div')
      paddingElement.classList.add('day', 'padding')
      this.calendar.appendChild(paddingElement)
    }
  }

  appendMonthDays(date) {
    while (date.getMonth() === this.calendarMonth.getMonth()) {
      const dayElement = document.createElement('div')
      dayElement.id = date.valueOf()
      dayElement.classList.add('day')
      dayElement.innerText = date.getDate()

      const slots = this.getSlotsForDay(date)

      if (slots) {
        const slotCountElement = document.createElement('div');
        slotCountElement.classList.add('slotCounter');
        slotCountElement.innerHTML = `<span>${slots.am?.length + slots.pm?.length}</span>`;

        const slotTextElement = document.createElement('div');
        slotTextElement.classList.add('slotText');
        slotTextElement.innerText = `Slots`;


        dayElement.appendChild(slotCountElement);
        dayElement.appendChild(slotTextElement);
        dayElement.classList.add('withSlots')

        const cbDate = new Date(date.valueOf())

        dayElement.addEventListener('click', () => {
          const selectedDays = document.getElementsByClassName('day selected')
          if (selectedDays.length > 0) {
            for (const day of selectedDays) {
              day.classList.remove('selected')
            }
          }

          dayElement.classList.add('selected')

          this.dateChangedCallback(cbDate, slots)
        })
      }

      this.calendar.appendChild(dayElement)

      date.setDate(date.getDate() + 1);
    }
  }

  getSlotsForDay(date) {
    const [day, month, year] = this.getDateValues(date)
    return this.slots?.[year]?.[month]?.[day]
  }

  getDateValues(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return [day, month, year]
  }

  getHeaderMonthAndYear(date) {
    const monthName = this.months[date.getMonth()];
    const year = date.getFullYear()

    return `${monthName} ${year}`
  }

  getDayOfWeek(date) {
    let day = date.getDay();
    if (day == 0) day = 7;
    return day - 1;
  }

  nextMonth() {
    this.calendarMonth = new Date(this.calendarMonth.setMonth(this.calendarMonth.getMonth()+1));
    this.buildCalendar()
  }

  previousMonth() {
    this.calendarMonth = new Date(this.calendarMonth.setMonth(this.calendarMonth.getMonth()-1));
    this.buildCalendar()
  }
}
