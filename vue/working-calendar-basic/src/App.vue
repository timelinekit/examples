<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { WorkingCalendarEditor, type WorkingCalendarEditorRef, setLicense } from '@timelinekit/vue';
import { WorkingCalendar, WorkingShift, TimeOfDay, LightWorkingCalendarTheme, DarkWorkingCalendarTheme } from '@timelinekit/core';
import '@timelinekit/core/styles';
import './App.css';

setLicense(import.meta.env.VITE_TK_LICENSE_KEY ?? '');

function buildDemoCalendar(): WorkingCalendar {
  const cal = new WorkingCalendar();
  cal.workingDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  cal.shifts = [
    new WorkingShift(new TimeOfDay(8, 0), new TimeOfDay(12, 0)),
    new WorkingShift(new TimeOfDay(13, 0), new TimeOfDay(17, 0)),
  ];
  cal.startOfWeek = 'monday';
  cal.nationalHolidays = [
    new Date(2026, 0, 1),
    new Date(2026, 4, 1),
    new Date(2026, 11, 24),
    new Date(2026, 11, 25),
  ];
  return cal;
}

const editorRef = ref<WorkingCalendarEditorRef>();
const canEdit = ref(true);
const isDark = ref(false);
const status = ref('');

function showStatus(msg: string, duration = 2000) {
  status.value = msg;
  setTimeout(() => { status.value = ''; }, duration);
}

onMounted(() => {
  const editor = editorRef.value;
  if (!editor) return;
  editor.calendar = buildDemoCalendar();

  editor.events.calendarChanged$.subscribe(() => {
    showStatus('Calendar changed');
  });
});

function toggleEdit() {
  const editor = editorRef.value;
  if (!editor) return;
  canEdit.value = !canEdit.value;
  editor.canEdit = canEdit.value;
}

function toggleTheme() {
  const editor = editorRef.value;
  if (!editor) return;
  isDark.value = !isDark.value;
  editor.theme = isDark.value ? new DarkWorkingCalendarTheme() : new LightWorkingCalendarTheme();
}

function validate() {
  const editor = editorRef.value;
  if (!editor) return;
  const result = editor.validateShifts();
  if (result.valid) {
    showStatus('Shifts are valid', 3000);
  } else {
    const msgs: string[] = [];
    if (result.overlapping.length > 0) msgs.push(`Overlapping: ${result.overlapping.join(', ')}`);
    if (result.invalidRange.length > 0) msgs.push(`Invalid range: ${result.invalidRange.join(', ')}`);
    showStatus(msgs.join(' | '), 3000);
  }
}

function reset() {
  const editor = editorRef.value;
  if (!editor) return;
  editor.calendar = buildDemoCalendar();
  showStatus('Reset');
}
</script>

<template>
  <div class="app">
    <h1>TimelineKit - Working Calendar</h1>
    <div class="toolbar">
      <button @click="toggleEdit">{{ canEdit ? 'Lock' : 'Unlock' }}</button>
      <button @click="toggleTheme">{{ isDark ? 'Light' : 'Dark' }}</button>
      <span class="separator" />
      <button @click="validate">Validate</button>
      <button @click="reset">Reset</button>
      <span v-if="status" class="status">{{ status }}</span>
    </div>
    <div class="editor-container">
      <WorkingCalendarEditor ref="editorRef" />
    </div>
  </div>
</template>
