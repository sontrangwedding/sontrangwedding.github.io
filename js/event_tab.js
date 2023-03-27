const GROOM_TAB = "groom";

const BRIDE_TAB = "bride";

const HIDDEN_CLASS = "hidden";

const EVENT_ACTIVE_TAB_CLASS = "event-tab-active";

const EVENT_TAB_ITEM_CLASS = "event-tab-item";

const GROOM_EVENT_TAB_ID = "groom_event_tab";

const BRIDE_EVENT_TAB_ID = "bride_event_tab";

const GROOM_EVENT_TAB_CONTENT_ID = "groom_event_tab_content";

const BRIDE_EVENT_TAB_CONTENT_ID = "bride_event_tab_content";

const GROOM_PARAM = "nha_trai";

const BRIDE_PARAM = "nha_gai";

const GROOM_URL = `?page=${GROOM_PARAM}#event`;

const BRIDE_URL = `?page=${BRIDE_PARAM}#event`;

function changeEventTab(tab = GROOM_TAB) {
  if (tab !== GROOM_TAB && tab !== BRIDE_TAB) {
    return false;
  }

  let tab_id = GROOM_EVENT_TAB_ID;
  let tab_content_id_to_hide = BRIDE_EVENT_TAB_CONTENT_ID;
  let tab_content_id_to_show = GROOM_EVENT_TAB_CONTENT_ID;
  let new_url = GROOM_URL;
  if (tab === BRIDE_TAB) {
    tab_id = BRIDE_EVENT_TAB_ID;
    tab_content_id_to_hide = GROOM_EVENT_TAB_CONTENT_ID;
    tab_content_id_to_show = BRIDE_EVENT_TAB_CONTENT_ID;
    new_url = BRIDE_URL;
  }

  changeEventTabStatus(tab_id);
  changeEventTabContent(tab_content_id_to_hide, tab_content_id_to_show);
  changeUrl(new_url);
}

function changeEventTabStatus(tab_id) {
  // Remove current active tab
  document
    .querySelectorAll(`.${EVENT_TAB_ITEM_CLASS}`)
    .forEach((el) => el.classList.remove(EVENT_ACTIVE_TAB_CLASS));

  document.getElementById(tab_id).classList.add(EVENT_ACTIVE_TAB_CLASS);
}

function changeEventTabContent(tab_content_id_to_hide, tab_content_id_to_show) {
  // Hide other tabs
  document.getElementById(tab_content_id_to_hide).classList.add(HIDDEN_CLASS);

  // Show destination tab
  let tab_content_element_to_show = document.getElementById(
    tab_content_id_to_show
  );
  tab_content_element_to_show.classList.remove(HIDDEN_CLASS);
  tab_content_element_to_show.style.animation = "fadeIn 1s";
}

function changeUrl(newUrl) {
  window.history.pushState({}, null, newUrl);
}

window.onload = function () {
  let search_params = new URLSearchParams(window.location.search);
  console.log(search_params.has("page"));
  if (search_params.has("page") && search_params.get("page") === BRIDE_PARAM) {
    changeEventTabStatus(BRIDE_EVENT_TAB_ID);
    changeEventTabContent(
      GROOM_EVENT_TAB_CONTENT_ID,
      BRIDE_EVENT_TAB_CONTENT_ID
    );
  }
};
