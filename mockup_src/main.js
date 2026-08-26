function goTo(n) {
  document.querySelectorAll('.stage').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.ctrl-tab').forEach(el => el.classList.remove('active'));
  document.querySelector(`[data-stage-panel="${n}"]`).classList.add('active');
  document.querySelector(`[data-stage="${n}"]`).classList.add('active');
}
