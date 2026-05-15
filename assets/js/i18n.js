(function () {
  var STORAGE_KEY = 'site-lang';
  var currentLang = localStorage.getItem(STORAGE_KEY) || 'en';

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');

    document.querySelectorAll('[data-i18n-en][data-i18n-zh]').forEach(function (el) {
      el.textContent = el.getAttribute(lang === 'zh' ? 'data-i18n-zh' : 'data-i18n-en');
    });

    document.querySelectorAll('[data-lang]').forEach(function (el) {
      var show = el.getAttribute('data-lang') === lang;
      if (show) {
        el.style.removeProperty('display');
      } else {
        el.style.display = 'none';
      }
    });

    var toggle = document.getElementById('lang-toggle');
    if (toggle) {
      toggle.setAttribute('aria-label', lang === 'zh' ? '切换到英文' : 'Switch to Chinese');
      toggle.querySelectorAll('[data-lang-choice]').forEach(function (el) {
        var active = el.getAttribute('data-lang-choice') === lang;
        el.classList.toggle('active', active);
      });
    }
  }

  window.applySiteLanguage = function () {
    setLang(currentLang);
  };

  window.toggleLang = function () {
    setLang(currentLang === 'zh' ? 'en' : 'zh');
  };

  document.addEventListener('DOMContentLoaded', function () {
    setLang(currentLang);
  });
})();
