var webData = {
    "id": 1,
    "event_name": "testing",
    "event_table": "event_testing",
    "event_slug": "testing",
    "location": null,
    "date_start": null,
    "date_end": null,
    "exclude_from_pre_registration": 0,
    "allow_multiple_value": null,
    "form_content": "[{\"name\":\"Wizard 1\",\"fields\":[{\"label-title\":\"Label 1\",\"label-color\":\"rgb(51,51,51)\",\"field_type\":\"label\"},{\"divider-size\":\"1px\",\"divider-style\":\"solid\",\"divider-color\":\"rgb(238,238,238)\",\"field_type\":\"divider\"},{\"field-label\":\"Textbox 3\",\"field-name\":\"Textbox_3\",\"field-placeholder\":\"\",\"field-required\":false,\"numeric-only\":false,\"field_type\":\"textbox\"},{\"field-label\":\"Textarea 4\",\"field-name\":\"Textarea_4\",\"field-placeholder\":\"\",\"field-required\":false,\"field_type\":\"textarea\"},{\"field-label\":\"Date 5\",\"field-name\":\"Date_5\",\"field-placeholder\":\"\",\"field-required\":false,\"field_type\":\"date\"},{\"field-name\":\"Province_6\",\"field-required\":false,\"field_type\":\"location\"},{\"field-label\":\"Email 7\",\"field-name\":\"Email_7\",\"field-required\":false,\"field_type\":\"email\"},{\"field-label\":\"Dropdown 8\",\"field-name\":\"Dropdown_8\",\"field-required\":false,\"field-options\":[{\"label\":\"Option 1\",\"value\":\"Option 1\"},{\"label\":\"Option 2\",\"value\":\"Option 2\"},{\"label\":\"Option 3\",\"value\":\"Option 3\"}],\"field_type\":\"dropdown\"},{\"field-label\":\"Radio 9\",\"field-name\":\"Radio_9\",\"field-required\":false,\"field-options\":[{\"label\":\"Option 1\",\"value\":\"Option 1\"},{\"label\":\"Option 2\",\"value\":\"Option 2\"},{\"label\":\"Option 3\",\"value\":\"Option 3\"}],\"field_type\":\"radio\"},{\"field-label\":\"Checkbox 10\",\"field-name\":\"Checkbox_10\",\"field-required\":false,\"field-options\":[{\"label\":\"Option 1\",\"value\":\"Option 1\"},{\"label\":\"Option 2\",\"value\":\"Option 2\"},{\"label\":\"Option 3\",\"value\":\"Option 3\"}],\"field_type\":\"checkbox\"},{\"field-label\":\"Subform 11\",\"form-name\":\"Subform_11\",\"subform-allow-multiple-values\":false,\"field_type\":\"subform\",\"fields\":[{\"label-title\":\"Label 12\",\"label-color\":\"rgb(51,51,51)\",\"field_type\":\"label\"},{\"divider-size\":\"1px\",\"divider-style\":\"solid\",\"divider-color\":\"rgb(238,238,238)\",\"field_type\":\"divider\"},{\"field-label\":\"Textbox 14\",\"field-name\":\"Textbox_14\",\"field-placeholder\":\"\",\"field-required\":false,\"numeric-only\":false,\"field_type\":\"textbox\"}],\"form_id\":6}]},{\"name\":\"Wizard 2\",\"fields\":[{\"field-label\":\"Textbox 15\",\"field-name\":\"Textbox_15\",\"field-placeholder\":\"\",\"field-required\":false,\"numeric-only\":false,\"field_type\":\"textbox\"},{\"field-label\":\"Textbox 16\",\"field-name\":\"Textbox_16\",\"field-placeholder\":\"\",\"field-required\":false,\"numeric-only\":false,\"field_type\":\"textbox\"},{\"field-label\":\"Textbox 17\",\"field-name\":\"Textbox_17\",\"field-placeholder\":\"\",\"field-required\":false,\"numeric-only\":false,\"field_type\":\"textbox\"}]},{\"name\":\"Wizard 3\",\"fields\":[{\"field-label\":\"Date 18\",\"field-name\":\"Date_18\",\"field-placeholder\":\"\",\"field-required\":false,\"field_type\":\"date\"},{\"field-label\":\"Dropdown 19\",\"field-name\":\"Dropdown_19\",\"field-required\":false,\"field-options\":[{\"label\":\"Option 1\",\"value\":\"Option 1\"},{\"label\":\"Option 2\",\"value\":\"Option 2\"},{\"label\":\"Option 3\",\"value\":\"Option 3\"}],\"field_type\":\"dropdown\"},{\"field-label\":\"Radio 20\",\"field-name\":\"Radio_20\",\"field-required\":false,\"field-options\":[{\"label\":\"Option 1\",\"value\":\"Option 1\"},{\"label\":\"Option 2\",\"value\":\"Option 2\"},{\"label\":\"Option 3\",\"value\":\"Option 3\"}],\"field_type\":\"radio\"}]}]",
    "mechanic": null,
    "parent_id": 0,
    "column": 1,
    "active_fields": "[\"textbox_3\",\"textarea_4\",\"date_5\",\"province_6\",\"email_7\",\"dropdown_8\",\"radio_9\",\"checkbox_10\",\"textbox_15\",\"textbox_16\",\"textbox_17\",\"date_18\",\"dropdown_19\",\"radio_20\"]",
    "subform": "[\"event_subform_11\"]",
    "account_id": 1,
    "deleted_at": null,
    "created_at": "2017-10-21 21:46:16",
    "updated_at": "2017-10-21 21:46:16"
}

webData.form_content = JSON.parse(webData.form_content);