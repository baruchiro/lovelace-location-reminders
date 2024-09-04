import logging
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.typing import ConfigType
from homeassistant.helpers.entity import Entity
from homeassistant.helpers.entity_component import EntityComponent
from homeassistant.const import STATE_UNKNOWN
from .const import DOMAIN


_LOGGER = logging.getLogger(__name__)

async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    _LOGGER.info("Setting up Location Reminder integration")
    hass.data[DOMAIN] = {
        "reminders": [],
        "zones": []
    }

    async def update_sensor_state():
        _LOGGER.info("Updating sensor state")
        reminders = hass.data[DOMAIN]["reminders"]
        zones = hass.data[DOMAIN]["zones"]
        hass.states.async_set(f'sensor.{DOMAIN}', len(reminders), {
            "reminders": reminders,
            "zones": zones
        })
        

    async def async_update_zones():
        zones = [zone.name for zone in hass.states.async_all() if zone.domain == 'zone']
        hass.data[DOMAIN]['zones'] = zones
        await update_sensor_state()
        _LOGGER.info(f"Updated zones: {zones}")

    async def handle_add_reminder(call):
        _LOGGER.info("Handling add_reminder service call")
        reminder = {
            "text": call.data.get("text"),
            "zone": call.data.get("zone")
        }
        hass.data[DOMAIN]["reminders"].append(reminder)
        await update_sensor_state()

    async def handle_remove_reminder(call):
        _LOGGER.info("Handling remove_reminder service call")
        index = call.data.get("index")
        if 0 <= index < len(hass.data[DOMAIN]["reminders"]):
            hass.data[DOMAIN]["reminders"].pop(index)
        await update_sensor_state()

    hass.services.async_register(DOMAIN, 'add_reminder', handle_add_reminder)
    hass.services.async_register(DOMAIN, 'remove_reminder', handle_remove_reminder)
    hass.services.async_register(DOMAIN, 'update_zones', async_update_zones)

    hass.async_create_task(async_update_zones())

    return True
