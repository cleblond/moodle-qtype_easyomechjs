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
 * easyomechjs question renderer class.
 *
 * @package    qtype
 * @subpackage easyomechjs
 * @copyright  2014 onwards Carl LeBlond 
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
defined('MOODLE_INTERNAL') || die();
$generatedfeedback = "";
/**
 * Generates the output for easyomechjs questions.
 *
 * @copyright  2014 onwards Carl LeBlond 
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class qtype_easyomechjs_renderer extends qtype_renderer {
    public function formulation_and_controls(question_attempt $qa, question_display_options $options) {
        global $CFG, $PAGE;
        $question        = $qa->get_question();
        $questiontext    = $question->format_questiontext($qa);
        $placeholder     = false;
        $myanswerid      = "my_answer" . $qa->get_slot();
        $correctanswerid = "correct_answer" . $qa->get_slot();
        $marvinjsconfig  = get_config('qtype_easyomechjs_options');
        $marvinjspath    = $marvinjsconfig->path;
        $protocol = (empty($_SERVER['HTTPS']) or $_SERVER['HTTPS'] == 'off') ? 'http://' : 'https://';
        $PAGE->requires->js(new moodle_url($protocol . $_SERVER['HTTP_HOST'] . $marvinjspath . '/js/promise-0.1.1.min.js'));
        $PAGE->requires->js(new moodle_url($protocol . $_SERVER['HTTP_HOST'] . $marvinjspath . '/js/marvinjslauncher.js'));
        if (preg_match('/_____+/', $questiontext, $matches)) {
            $placeholder = $matches[0];
        }
        $name2  = 'EASYOMECH' . $qa->get_slot();
        $result = '';
        if ($placeholder) {
            $toreplace    = html_writer::tag('span', get_string('enablejavaandjavascript', 'qtype_easyomechjs'), array(
                'class' => 'ablock'
            ));
            $questiontext = substr_replace($questiontext, $toreplace, strpos($questiontext, $placeholder), strlen($placeholder));
        }
        $result .= html_writer::tag('div', $questiontext, array(
            'class' => 'qtext'
        ));
        if ($options->readonly) {
            $result .= html_writer::tag('input', '', array(
                'id' => 'myresponse' . $qa->get_slot(),
                'type' => 'button',
                'value' => 'My Response'
            ));
            $result .= html_writer::tag('input', '', array(
                'id' => 'corresponse' . $qa->get_slot(),
                'type' => 'button',
                'value' => 'Correct Answer'
            ));
            $this->page->requires->js_init_call('M.qtype_easyomechjs.showmyresponse', array(
                $CFG->version,
                $qa->get_slot()
            ));
            $this->page->requires->js_init_call('M.qtype_easyomechjs.showcorresponse', array(
                $CFG->version,
                $qa->get_slot()
            ));
        }
        $toreplaceid = 'applet' . $qa->get_slot();
        $toreplace   = html_writer::tag('div', get_string('enablejavaandjavascript', 'qtype_easyomechjs'), array(
            'id' => $toreplaceid, 'class' => 'easyomechjs resizable'
        ));
        if (!$placeholder) {
            $answerlabel = html_writer::tag('span', get_string('answer', 'qtype_easyomechjs', ''), array(
                'class' => 'answerlabel'
            ));
            $result .= html_writer::tag('div', $answerlabel . $toreplace, array(
                'class' => 'ablock'
            ));
        }
        if ($qa->get_state() == question_state::$invalid) {
            $lastresponse = $this->get_last_response($qa);
            $result .= html_writer::nonempty_tag('div', $question->get_validation_error($lastresponse), array(
                'class' => 'validationerror'
            ));
        }

        if (!$options->readonly) {
            $question   = $qa->get_question();
            $answertemp = $question->get_correct_response();
            $currentanswer    = $qa->get_last_qt_var('answer');
            if ($currentanswer != null) {
                $strippedxml = $currentanswer;
            } else {
                $strippedxml = $this->remove_xml_tags($answertemp['answer'], 'MEFlow');
            }
            $strippedanswerid = "stripped_answer" . $qa->get_slot();
            $result .= html_writer::tag('textarea', $strippedxml, array(
                'id' => $strippedanswerid,
                'style' => 'display:none;',
                'name' => $strippedanswerid
            ));
        }
        if ($options->readonly) {
            $currentanswer    = $qa->get_last_qt_var('answer');
            $strippedanswerid = "stripped_answer" . $qa->get_slot();
            $result .= html_writer::tag('textarea', $currentanswer, array(
                'id' => $strippedanswerid,
                'style' => 'display:none;',
                'name' => $strippedanswerid
            ));
            $answertemp = $question->get_correct_response();
            // Buttons to show correct and user answers - yeah its a hack!
            $result .= html_writer::tag('textarea', $qa->get_last_qt_var('answer'), array(
                'id' => $myanswerid,
                'name' => $myanswerid,
                'style' => 'display:none;'
            ));
            $result .= html_writer::tag('textarea', $answertemp['answer'], array(
                'id' => $correctanswerid,
                'name' => $correctanswerid,
                'style' => 'display:none;'
            ));
        }
        $result .= html_writer::tag('div', $this->hidden_fields($qa), array(
            'class' => 'inputcontrol'
        ));
        $this->require_js($toreplaceid, $qa, $options->readonly, $options->correctness);
        return $result;
    }
    protected function remove_xml_tags($xmlstring, $tag) {
        $dom = new DOMDocument();
        $dom->loadXML($xmlstring);
        $featuredde1 = $dom->getElementsByTagName($tag);
        $length      = $featuredde1->length;
        for ($i = 0; $i < $length; $i++) {
            $temp = $featuredde1->item(0); // Avoid calling a function twice!
            $temp->parentNode->removeChild($temp);
        }
        return $dom->saveXML();
    }
    protected function general_feedback(question_attempt $qa) {
        $question = $qa->get_question();
        return $question->usecase . $qa->get_question()->format_generalfeedback($qa);
    }
    protected function require_js($toreplaceid, question_attempt $qa, $readonly, $correctness) {
        global $PAGE, $CFG;
        $marvinjsconfig = get_config('qtype_easyomechjs_options');
        $protocol = (empty($_SERVER['HTTPS']) or $_SERVER['HTTPS'] == 'off') ? 'http://' : 'https://';
        $marvinjspath   = $protocol. $_SERVER['HTTP_HOST'] . $marvinjsconfig->path;
        $topnode        = 'div.que.easyomechjs#q' . $qa->get_slot();
        $feedbackimage  = '';
        if ($correctness) {
            $feedbackimage = $this->feedback_image($this->fraction_for_last_response($qa));
        }
        $name             = 'EASYOMECH' . $qa->get_slot();
        $appletid         = 'easyomechjs' . $qa->get_slot();
        $strippedanswerid = "stripped_answer" . $qa->get_slot();
        $PAGE->requires->js_init_call('M.qtype_easyomechjs.insert_easyomechjs_applet', array(
            $toreplaceid,
            $name,
            $appletid,
            $topnode,
            $feedbackimage,
            $readonly,
            $strippedanswerid,
            $CFG->wwwroot,
            $marvinjspath
        ), false);
    }
    protected function fraction_for_last_response(question_attempt $qa) {
        $question     = $qa->get_question();
        $lastresponse = $this->get_last_response($qa);
        $answer       = $question->get_matching_answer($lastresponse);
        if ($answer) {
            $fraction = $answer->fraction;
        } else {
            $fraction = 0;
        }
        return $fraction;
    }
    protected function get_last_response(question_attempt $qa) {
        $question       = $qa->get_question();
        $responsefields = array_keys($question->get_expected_data());
        $response       = array();
        foreach ($responsefields as $responsefield) {
            $response[$responsefield] = $qa->get_last_qt_var($responsefield);
        }
        return $response;
    }
    public function specific_feedback(question_attempt $qa) {
        $question = $qa->get_question();
        $answer   = $question->get_matching_answer($this->get_last_response($qa));
        if (!$answer) {
            return '';
        }
        $feedback = '';
        if ($answer->feedback) {
            $feedback .= $question->format_text($answer->feedback, $answer->feedbackformat, $qa,
            'question', 'answerfeedback', $answer->id);
        }
        return $feedback;
    }
    public function correct_response(question_attempt $qa) {
        $question = $qa->get_question();
        $answer   = $question->get_matching_answer($question->get_correct_response());
        if (!$answer) {
            return '';
        }
    }
    protected function hidden_fields(question_attempt $qa) {
        $question         = $qa->get_question();
        $hiddenfieldshtml = '';
        $inputids         = new stdClass();
        $responsefields   = array_keys($question->get_expected_data());
        foreach ($responsefields as $responsefield) {
            $hiddenfieldshtml .= $this->hidden_field_for_qt_var($qa, $responsefield);
        }
        return $hiddenfieldshtml;
    }
    protected function hidden_field_for_qt_var(question_attempt $qa, $varname) {
        $value      = $qa->get_last_qt_var($varname, '');
        $fieldname  = $qa->get_qt_field_name($varname);
        $attributes = array(
            'type' => 'hidden',
            'id' => str_replace(':', '_', $fieldname),
            'class' => $varname,
            'name' => $fieldname,
            'value' => $value
        );
        return html_writer::empty_tag('input', $attributes);
    }
}
