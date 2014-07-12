<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.
/**
 * Defines the editing form for the easyomechjs question type.
 *
 * @package    qtype
 * @subpackage easyomechjs
 * @copyright  2014 and onward Carl LeBlond
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
defined('MOODLE_INTERNAL') || die();
require_once($CFG->dirroot . '/question/type/shortanswer/edit_shortanswer_form.php');
class qtype_easyomechjs_edit_form extends qtype_shortanswer_edit_form {
    protected function definition_inner($mform) {
        global $PAGE, $CFG;
        $PAGE->requires->css('/question/type/easyomechjs/easyomechjs_styles.css');
        $marvinjsconfig = get_config('qtype_easyomechjs_options');
        $marvinjspath   = $marvinjsconfig->path;
        $PAGE->requires->js(new moodle_url('http://' . $_SERVER['HTTP_HOST'] . $marvinjspath . '/js/promise-0.1.1.min.js'));
        $PAGE->requires->js(new moodle_url('http://' . $_SERVER['HTTP_HOST'] . $marvinjspath . '/js/marvinjslauncher.js'));
        $mform->addElement('static', 'answersinstruct',
            get_string('correctanswers', 'qtype_easyomechjs'), get_string('filloutoneanswer', 'qtype_easyomechjs'));
        $mform->closeHeaderBefore('answersinstruct');
        $menu = array(
            get_string('caseshowproducts', 'qtype_easyomechjs'),
            get_string('casenoshowproducts', 'qtype_easyomechjs')
        );
        $mform->addElement('select', 'hideproducts', get_string('caseshowornoshowproducts', 'qtype_easyomechjs'), $menu);
        $menu = array(
            get_string('ordernotimportant', 'qtype_easyomechjs'),
            get_string('orderimportant', 'qtype_easyomechjs')
        );
        $mform->addElement('select', 'orderimportant', get_string('caseorderimportant', 'qtype_easyomechjs'), $menu);
        $mform->addElement('html', html_writer::start_tag('div', array(
            'style' => 'width:650px;',
            'id' => 'appletdiv'
        )));
        $mform->addElement('html', html_writer::start_tag('div', array(
            'style' => 'float: left;font-style: italic ;'
        )));
        $mform->addElement('html', html_writer::start_tag('small'));
        $easyomechjshomeurl = 'http://www.chemaxon.com';
        $mform->addElement('html', html_writer::link($easyomechjshomeurl, get_string('easyomechjseditor', 'qtype_easyomechjs')));
        $mform->addElement('html', html_writer::empty_tag('br'));
        $mform->addElement('html', html_writer::tag('span', get_string('author', 'qtype_easyomechjs'), array(
            'class' => 'easyomechjsauthor'
        )));
        $mform->addElement('html', html_writer::end_tag('small'));
        $mform->addElement('html', html_writer::end_tag('div'));
        $mform->addElement('html', html_writer::end_tag('div'));
        $marvinconfig = get_config('qtype_easyomechjs_options');
        $marvinpath   = $marvinconfig->path;
        $PAGE->requires->js_init_call('M.qtype_easyomechjs.insert_applet', array(
            $CFG->wwwroot,
            $marvinpath
        ));
        $this->add_per_answer_fields($mform,
            get_string('answerno', 'qtype_easyomechjs', '{no}'), question_bank::fraction_options());
        $this->add_interactive_settings();
        $PAGE->requires->js_init_call('M.qtype_easyomechjs.init_getanswerstring', array(
            $CFG->version
        ));
    }
    protected function get_per_answer_fields($mform, $label, $gradeoptions, &$repeatedoptions, &$answersoption) {
        $repeated     = parent::get_per_answer_fields($mform, $label, $gradeoptions, $repeatedoptions, $answersoption);
        $scriptattrs  = 'class = id_insert';
        $insertbutton = $mform->createElement('button', 'insert',
            get_string('insertfromeditor', 'qtype_easyomechjs'), $scriptattrs);
        array_splice($repeated, 2, 0, array(
            $insertbutton
        ));
        return $repeated;
    }
    protected function data_preprocessing($question) {
        $question = parent::data_preprocessing($question);
        return $question;
    }
    public function qtype() {
        return 'easyomechjs';
    }
}
