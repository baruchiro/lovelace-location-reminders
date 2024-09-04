# Location Reminders


[![License](https://img.shields.io/github/license/baruchiro/lovelace-location-reminders.svg)](LICENSE)

Location Reminders is a custom integration for Home Assistant that allows you to set reminders based on your location. This integration is available through the Home Assistant Community Store (HACS) and includes a dashboard plugin (custom card) for easy management.

## Installation

### HACS (Home Assistant Community Store)

1. Ensure that HACS is installed and configured in your Home Assistant instance.
2. Go to the HACS panel in Home Assistant.
3. Click on "Integrations".
4. Search for "Location Reminders".
5. Click "Install".

### Manual Installation

1. Download the latest release from the [GitHub releases page](https://github.com/baruchiro/lovelace-location-reminders/releases).
2. Extract the downloaded archive.
3. Copy the `custom_components/location_reminders` directory to your Home Assistant `custom_components` directory.

## Configuration

1. Add the following to your `configuration.yaml` file:

    ```yaml
    location_reminders:
    ```

2. Restart Home Assistant.

## Usage

### Dashboard Plugin (Custom Card)

This integration includes a custom Lovelace card for managing location-based reminders directly from the Home Assistant dashboard.

#### Adding the Custom Card

1. Go to your Home Assistant Lovelace dashboard.
2. Click on the three dots menu (⋮) in the top right corner and select "Edit Dashboard".
3. Click on "Add Card".
4. Search for "Location Reminders" and select it.
5. Configure the card as needed and click "Save".

#### Example Configuration

```yaml
type: custom:location-reminders-card
title: Location Reminders
```

## Services

In addition to the dashboard plugin, this integration provides the following services:

- `location_reminders.add_reminder`: Add a new reminder.
- `location_reminders.remove_reminder`: Remove an existing reminder.
- `location_reminders.update_zones`: Update the list of zones.

#### Example Service Call

To add a reminder, use the following service call:

```yaml
service: location_reminders.add_reminder
data:
  text: "Buy groceries"
  zone: "home"
```

To remove a reminder, use the following service call:

```yaml
service: location_reminders.remove_reminder
data:
  index: 0
```

To update the list of zones, use the following service call:

```yaml
service: location_reminders.update_zones
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues and feature requests, please use the GitHub issue tracker.

