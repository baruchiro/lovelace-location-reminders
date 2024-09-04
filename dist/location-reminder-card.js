class LocationReminderCard extends HTMLElement {
    set hass(hass) {
        let root = this.shadowRoot;
        if (!root) {
            this.attachShadow({ mode: 'open' });
            root = this.shadowRoot;
        }

        const reminders = hass.states['sensor.location_reminders']?.attributes.reminders || [];
        const zones = hass.states['sensor.location_reminders']?.attributes.zones || [];

        root.innerHTML = `
            <ha-card header="Location Reminder">
                <div class="card-content">
                    ${reminders.map((reminder, index) => `
                        <div>
                            <span>${reminder.text} - ${reminder.zone}</span>
                            <button class="remove" data-index="${index}">Remove</button>
                        </div>
                    `).join('')}
                    <div>
                        <input type="text" id="text" placeholder="Reminder Text">
                        <select id="zone">
                            ${zones.map(zone => `
                                <option value="${zone}">${zone}</option>
                            `).join('')}
                        </select>
                        <button id="add">Add Reminder</button>
                    </div>
                </div>
            </ha-card>
        `;

        root.querySelector('#add').onclick = async () => {
            const text = root.querySelector('#text').value;
            const zone = root.querySelector('#zone').value;

            // Send data to the backend
            await hass.callService('location_reminders', 'add_reminder', { text, zone }).catch(console.error);

            // Update the list of reminders dynamically
            const reminderList = root.querySelector('.card-content');
            const listItem = document.createElement('div');
            listItem.innerHTML = `
                <span>${text} - ${zone}</span>
                <button class="remove" data-index="${reminders.length}">Remove</button>
            `;
            reminderList.insertBefore(listItem, reminderList.lastElementChild);

            // Clear the form fields
            root.querySelector('#text').value = '';
            root.querySelector('#zone').value = '';

            // Re-attach remove event listener to the new button
            listItem.querySelector('.remove').onclick = (e) => {
                const index = e.target.dataset.index;
                hass.callService('location_reminders', 'remove_reminder', { index });
            };
        };

        root.querySelectorAll('.remove').forEach(button => {
            button.onclick = (e) => {
                const index = e.target.dataset.index;
                hass.callService('location_reminders', 'remove_reminder', { index });
            };
        });
    }

    setConfig(config) {
        // Configuration options (if any)
    }

    getCardSize() {
        return 3;
    }
}

customElements.define('location-reminder-card', LocationReminderCard);