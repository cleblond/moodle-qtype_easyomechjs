<?php

defined('MOODLE_INTERNAL') || die;

if ($ADMIN->fulltree) {
    $settings->add(new admin_setting_configtext('qtype_easyomechjs_options/path', get_string('easyomechjs_options', 'qtype_easyomechjs'),
                   get_string('configeasyomechjsoptions', 'qtype_easyomechjs'), '/marvin4js', PARAM_TEXT));
}
