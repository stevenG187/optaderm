(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./assets/js/theme/artisan/product.js":
/*!********************************************!*\
  !*** ./assets/js/theme/artisan/product.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return loaded; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

function loaded() {
  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('#tab-specifications').text().trim() !== '') {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.tab-heading--specs').show();
  }

  // bulk pricing
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('.productView-info-bulkPricing li').each(function formatRule() {
    var priceRules = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).text().trim().replace(/\r?\n|\r/g, '').split(/(.*)(and get | and pay only)/gi);
    var formattedRule = "<strong>" + priceRules[1] + "</strong>" + priceRules[2] + "<strong><span>" + priceRules[3] + "</span></strong>";
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).html(formattedRule);
  });
  jquery__WEBPACK_IMPORTED_MODULE_0___default()('#form-action-addToCart').on('click', function () {
    var formTop = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.productView-options form').offset().top;
    var headerHeight = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.header').height();
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).scrollTop(formTop - headerHeight);
  });
}

/***/ }),

/***/ "./assets/js/theme/common/models/forms.js":
/*!************************************************!*\
  !*** ./assets/js/theme/common/models/forms.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var forms = {
  email: function email(value) {
    var re = /^.+@.+\..+/;
    return re.test(value);
  },
  /**
   * Validates a password field
   * @param value
   * @returns {boolean}
   */
  password: function password(value) {
    return this.notEmpty(value);
  },
  /**
   * validates if a field is empty
   * @param value
   * @returns {boolean}
   *
   */
  notEmpty: function notEmpty(value) {
    return value.length > 0;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./assets/js/theme/common/utils/form-utils.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/common/utils/form-utils.js ***!
  \****************************************************/
/*! exports provided: createPasswordValidationErrorTextObject, classifyForm, Validators, insertStateHiddenField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPasswordValidationErrorTextObject", function() { return createPasswordValidationErrorTextObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classifyForm", function() { return classifyForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Validators", function() { return Validators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insertStateHiddenField", function() { return insertStateHiddenField; });
/* harmony import */ var lodash_capitalize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/capitalize */ "./node_modules/lodash/capitalize.js");
/* harmony import */ var lodash_capitalize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_capitalize__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_camelCase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/camelCase */ "./node_modules/lodash/camelCase.js");
/* harmony import */ var lodash_camelCase__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_camelCase__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/includes */ "./node_modules/lodash/includes.js");
/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_includes__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _models_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../models/forms */ "./assets/js/theme/common/models/forms.js");





var inputTagNames = ['input', 'select', 'textarea'];
/**
 * Set up Object with Error Messages on Password Validation. Please use messages in mentioned order
 * @param {string} empty defines error text for empty field
 * @param {string} confirm defines error text for empty confirmation field
 * @param {string} mismatch defines error text if confirm passford mismatches passford field
 * @param {string} invalid defines error text for invalid password charaters sequence
 * @return {object} messages or default texts if nothing is providing
 */
var createPasswordValidationErrorTextObject = function createPasswordValidationErrorTextObject(empty, confirm, mismatch, invalid) {
  return {
    onEmptyPasswordErrorText: empty,
    onConfirmPasswordErrorText: confirm,
    onMismatchPasswordErrorText: mismatch,
    onNotValidPasswordErrorText: invalid
  };
};

/**
 * Apply class name to an input element on its type
 * @param {object} input
 * @param {string} formFieldClass
 * @return {object} Element itself
 */
function classifyInput(input, formFieldClass) {
  var $input = $(input);
  var $formField = $input.parent("." + formFieldClass);
  var tagName = $input.prop('tagName').toLowerCase();
  var className = formFieldClass + "--" + tagName;
  var specificClassName;

  // Input can be text/checkbox/radio etc...
  if (tagName === 'input') {
    var inputType = $input.prop('type');
    if (lodash_includes__WEBPACK_IMPORTED_MODULE_2___default()(['radio', 'checkbox', 'submit'], inputType)) {
      // ie: .form-field--checkbox, .form-field--radio
      className = formFieldClass + "--" + lodash_camelCase__WEBPACK_IMPORTED_MODULE_1___default()(inputType);
    } else {
      // ie: .form-field--input .form-field--inputText
      specificClassName = "" + className + lodash_capitalize__WEBPACK_IMPORTED_MODULE_0___default()(inputType);
    }
  }

  // Apply class modifier
  return $formField.addClass(className).addClass(specificClassName);
}

/**
 * Apply class name to each input element in a form based on its type
 * @example
 * // Before
 * <form id="form">
 *     <div class="form-field">
 *         <input type="text">
 *     </div>
 *     <div class="form-field">
 *         <select>...</select>
 *     </div>
 * </form>
 *
 * classifyForm('#form', { formFieldClass: 'form-field' });
 *
 * // After
 * <div class="form-field form-field--input form-field--inputText">...</div>
 * <div class="form-field form-field--select">...</div>
 *
 * @param {string|object} formSelector - selector or element
 * @param {object} options
 * @return {jQuery} Element itself
 */
function classifyForm(formSelector, options) {
  if (options === void 0) {
    options = {};
  }
  var $form = $(formSelector);
  var $inputs = $form.find(inputTagNames.join(', '));

  // Obtain options
  var _options = options,
    _options$formFieldCla = _options.formFieldClass,
    formFieldClass = _options$formFieldCla === void 0 ? 'form-field' : _options$formFieldCla;

  // Classify each input in a form
  $inputs.each(function (__, input) {
    classifyInput(input, formFieldClass);
  });
  return $form;
}

/**
 * Get id from given field
 * @param {object} $field JQuery field object
 * @return {string}
 */
function getFieldId($field) {
  var fieldId = $field.prop('name').match(/(\[.*\])/);
  if (fieldId && fieldId.length !== 0) {
    return fieldId[0];
  }
  return '';
}

/**
 * Insert hidden field after State/Province field
 * @param {object} $stateField JQuery field object
 */
function insertStateHiddenField($stateField) {
  var fieldId = getFieldId($stateField);
  var stateFieldAttrs = {
    type: 'hidden',
    name: "FormFieldIsText" + fieldId,
    value: '1'
  };
  $stateField.after($('<input />', stateFieldAttrs));
}
var Validators = {
  /**
   * Sets up a new validation when the form is dirty
   * @param validator
   * @param field
   * @param {string} errorText describes errorMassage on email validation
   */
  setEmailValidation: function setEmailValidation(validator, field, errorText) {
    if (field) {
      validator.add({
        selector: field,
        validate: function validate(cb, val) {
          var result = _models_forms__WEBPACK_IMPORTED_MODULE_4__["default"].email(val);
          cb(result);
        },
        errorMessage: errorText
      });
    }
  },
  /**
   * Validate password fields
   * @param validator
   * @param passwordSelector
   * @param password2Selector
   * @param requirements
   * @param {object} errorTextsObject
   * @param isOptional
   */
  setPasswordValidation: function setPasswordValidation(validator, passwordSelector, password2Selector, requirements, _ref, isOptional) {
    var onEmptyPasswordErrorText = _ref.onEmptyPasswordErrorText,
      onConfirmPasswordErrorText = _ref.onConfirmPasswordErrorText,
      onMismatchPasswordErrorText = _ref.onMismatchPasswordErrorText,
      onNotValidPasswordErrorText = _ref.onNotValidPasswordErrorText;
    var $password = $(passwordSelector);
    var passwordValidations = [{
      selector: passwordSelector,
      validate: function validate(cb, val) {
        var result = val.length;
        if (isOptional) {
          return cb(true);
        }
        cb(result);
      },
      errorMessage: onEmptyPasswordErrorText
    }, {
      selector: passwordSelector,
      validate: function validate(cb, val) {
        var result = val.match(new RegExp(requirements.alpha)) && val.match(new RegExp(requirements.numeric)) && val.length >= requirements.minlength;

        // If optional and nothing entered, it is valid
        if (isOptional && val.length === 0) {
          return cb(true);
        }
        cb(result);
      },
      errorMessage: onNotValidPasswordErrorText
    }, {
      selector: password2Selector,
      validate: function validate(cb, val) {
        var result = val.length;
        if (isOptional) {
          return cb(true);
        }
        cb(result);
      },
      errorMessage: onConfirmPasswordErrorText
    }, {
      selector: password2Selector,
      validate: function validate(cb, val) {
        var result = val === $password.val();
        cb(result);
      },
      errorMessage: onMismatchPasswordErrorText
    }];
    validator.add(passwordValidations);
  },
  /**
   * Validate password fields
   * @param {Nod} validator
   * @param {Object} selectors
   * @param {string} selectors.errorSelector
   * @param {string} selectors.fieldsetSelector
   * @param {string} selectors.formSelector
   * @param {string} selectors.maxPriceSelector
   * @param {string} selectors.minPriceSelector
   */
  setMinMaxPriceValidation: function setMinMaxPriceValidation(validator, selectors, priceValidationErrorTexts) {
    if (priceValidationErrorTexts === void 0) {
      priceValidationErrorTexts = {};
    }
    var errorSelector = selectors.errorSelector,
      fieldsetSelector = selectors.fieldsetSelector,
      formSelector = selectors.formSelector,
      maxPriceSelector = selectors.maxPriceSelector,
      minPriceSelector = selectors.minPriceSelector;

    // eslint-disable-next-line object-curly-newline
    var _priceValidationError = priceValidationErrorTexts,
      onMinPriceError = _priceValidationError.onMinPriceError,
      onMaxPriceError = _priceValidationError.onMaxPriceError,
      minPriceNotEntered = _priceValidationError.minPriceNotEntered,
      maxPriceNotEntered = _priceValidationError.maxPriceNotEntered,
      onInvalidPrice = _priceValidationError.onInvalidPrice;
    validator.configure({
      form: formSelector,
      preventSubmit: true,
      successClass: '_' // KLUDGE: Don't apply success class
    });
    validator.add({
      errorMessage: onMinPriceError,
      selector: minPriceSelector,
      validate: "min-max:" + minPriceSelector + ":" + maxPriceSelector
    });
    validator.add({
      errorMessage: onMaxPriceError,
      selector: maxPriceSelector,
      validate: "min-max:" + minPriceSelector + ":" + maxPriceSelector
    });
    validator.add({
      errorMessage: maxPriceNotEntered,
      selector: maxPriceSelector,
      validate: 'presence'
    });
    validator.add({
      errorMessage: minPriceNotEntered,
      selector: minPriceSelector,
      validate: 'presence'
    });
    validator.add({
      errorMessage: onInvalidPrice,
      selector: [minPriceSelector, maxPriceSelector],
      validate: 'min-number:0'
    });
    validator.setMessageOptions({
      selector: [minPriceSelector, maxPriceSelector],
      parent: fieldsetSelector,
      errorSpan: errorSelector
    });
  },
  /**
   * Sets up a new validation when the form is dirty
   * @param validator
   * @param field
   */
  setStateCountryValidation: function setStateCountryValidation(validator, field, errorText) {
    if (field) {
      validator.add({
        selector: field,
        validate: 'presence',
        errorMessage: errorText
      });
    }
  },
  /**
   * Removes classes from dirty form if previously checked
   * @param field
   */
  cleanUpStateValidation: function cleanUpStateValidation(field) {
    var $fieldClassElement = $("[data-type=\"" + field.data('fieldType') + "\"]");
    Object.keys(_nod__WEBPACK_IMPORTED_MODULE_3__["default"].classes).forEach(function (value) {
      if ($fieldClassElement.hasClass(_nod__WEBPACK_IMPORTED_MODULE_3__["default"].classes[value])) {
        $fieldClassElement.removeClass(_nod__WEBPACK_IMPORTED_MODULE_3__["default"].classes[value]);
      }
    });
  }
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/utils/safe-string.js":
/*!*****************************************************!*\
  !*** ./assets/js/theme/common/utils/safe-string.js ***!
  \*****************************************************/
/*! exports provided: safeString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "safeString", function() { return safeString; });
/**
 * This function parses HTML entities in strings
 * @param str: String
 * @returns String
*/
var safeString = function safeString(str) {
  var d = new DOMParser();
  return d.parseFromString(str, 'text/html').body.textContent;
};

/***/ }),

/***/ "./assets/js/theme/product.js":
/*!************************************!*\
  !*** ./assets/js/theme/product.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Product; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _product_reviews__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product/reviews */ "./assets/js/theme/product/reviews.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _common_product_details__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/product-details */ "./assets/js/theme/common/product-details.js");
/* harmony import */ var _product_video_gallery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./product/video-gallery */ "./assets/js/theme/product/video-gallery.js");
/* harmony import */ var _artisan_product__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./artisan/product */ "./assets/js/theme/artisan/product.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
/*
 Import all product specific js
 */








var WRITE_REVIEW = _global_modal__WEBPACK_IMPORTED_MODULE_7__["modalTypes"].WRITE_REVIEW;
var Product = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Product, _PageManager);
  function Product(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    _this.url = window.location.href;
    _this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    _this.$bulkPricingLink = $('[data-reveal-id="modal-bulk-pricing"]');
    _this.reviewModal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_7__["default"])('#modal-review-form')[0];
    return _this;
  }
  var _proto = Product.prototype;
  _proto.onReady = function onReady() {
    var _this2 = this;
    // Listen for foundation modal close events to sanitize URL after review.
    $(document).on('close.fndtn.reveal', function () {
      if (_this2.url.indexOf('#write_review') !== -1 && typeof window.history.replaceState === 'function') {
        window.history.replaceState(null, document.title, window.location.pathname);
      }
    });
    var validator;

    // Init collapsible
    Object(_common_collapsible__WEBPACK_IMPORTED_MODULE_2__["default"])();
    this.productDetails = new _common_product_details__WEBPACK_IMPORTED_MODULE_3__["default"]($('.productView'), this.context, window.BCData.product_attributes);
    this.productDetails.setProductVariant();
    Object(_product_video_gallery__WEBPACK_IMPORTED_MODULE_4__["default"])();
    this.bulkPricingHandler();
    var $reviewForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_6__["classifyForm"])('.writeReview-form');
    if ($reviewForm.length === 0) return;
    var review = new _product_reviews__WEBPACK_IMPORTED_MODULE_1__["default"]($reviewForm);
    $(document).on('opened.fndtn.reveal', '#modal-review-form', function () {
      return _this2.reviewModal.setupFocusableElements(WRITE_REVIEW);
    });
    $('body').on('click', '[data-reveal-id="modal-review-form"]', function () {
      validator = review.registerValidation(_this2.context);
      _this2.ariaDescribeReviewInputs($reviewForm);
    });
    $reviewForm.on('submit', function () {
      if (validator) {
        validator.performCheck();
        return validator.areAll('valid');
      }
      return false;
    });
    Object(_artisan_product__WEBPACK_IMPORTED_MODULE_5__["default"])();
    this.productReviewHandler();
  };
  _proto.ariaDescribeReviewInputs = function ariaDescribeReviewInputs($form) {
    $form.find('[data-input]').each(function (_, input) {
      var $input = $(input);
      var msgSpanId = $input.attr('name') + "-msg";
      $input.siblings('span').attr('id', msgSpanId);
      $input.attr('aria-describedby', msgSpanId);
    });
  };
  _proto.productReviewHandler = function productReviewHandler() {
    if (this.url.indexOf('#write_review') !== -1) {
      this.$reviewLink.trigger('click');
    }
  };
  _proto.bulkPricingHandler = function bulkPricingHandler() {
    if (this.url.indexOf('#bulk_pricing') !== -1) {
      this.$bulkPricingLink.trigger('click');
    }
  };
  return Product;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/product/reviews.js":
/*!********************************************!*\
  !*** ./assets/js/theme/product/reviews.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _common_models_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/models/forms */ "./assets/js/theme/common/models/forms.js");
/* harmony import */ var _common_utils_safe_string__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/utils/safe-string */ "./assets/js/theme/common/utils/safe-string.js");




var _default = /*#__PURE__*/function () {
  function _default($reviewForm) {
    this.validator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_0__["default"])({
      submit: $reviewForm.find('input[type="submit"]')
    });
    this.$reviewsContent = $('#product-reviews');
    this.$collapsible = $('[data-collapsible]', this.$reviewsContent);
    this.initLinkBind();
    this.injectPaginationLink();
    this.collapseReviews();
  }

  /**
   * On initial page load, the user clicks on "(12 Reviews)" link
   * The browser jumps to the review page and should expand the reviews section
   */
  var _proto = _default.prototype;
  _proto.initLinkBind = function initLinkBind() {
    var _this = this;
    var $content = $('#productReviews-content', this.$reviewsContent);
    $('#productReview_link').on('click', function () {
      $('.productView-reviewTabLink').trigger('click');
      if (!$content.hasClass('is-open')) {
        _this.$collapsible.trigger(_common_collapsible__WEBPACK_IMPORTED_MODULE_1__["CollapsibleEvents"].click);
      }
    });
  };
  _proto.collapseReviews = function collapseReviews() {
    // We're in paginating state, do not collapse
    if (window.location.hash && window.location.hash.indexOf('#product-reviews') === 0) {
      return;
    }

    // force collapse on page load
    this.$collapsible.trigger(_common_collapsible__WEBPACK_IMPORTED_MODULE_1__["CollapsibleEvents"].click);
  }

  /**
   * Inject ID into the pagination link
   */;
  _proto.injectPaginationLink = function injectPaginationLink() {
    var $nextLink = $('.pagination-item--next .pagination-link', this.$reviewsContent);
    var $prevLink = $('.pagination-item--previous .pagination-link', this.$reviewsContent);
    if ($nextLink.length) {
      $nextLink.attr('href', $nextLink.attr('href') + " #product-reviews");
    }
    if ($prevLink.length) {
      $prevLink.attr('href', $prevLink.attr('href') + " #product-reviews");
    }
  };
  _proto.registerValidation = function registerValidation(context) {
    this.context = context;
    this.validator.add([{
      selector: '[name="revrating"]',
      validate: 'presence',
      errorMessage: Object(_common_utils_safe_string__WEBPACK_IMPORTED_MODULE_3__["safeString"])(this.context.reviewRating)
    }, {
      selector: '[name="revtitle"]',
      validate: 'presence',
      errorMessage: Object(_common_utils_safe_string__WEBPACK_IMPORTED_MODULE_3__["safeString"])(this.context.reviewSubject)
    }, {
      selector: '[name="revtext"]',
      validate: 'presence',
      errorMessage: Object(_common_utils_safe_string__WEBPACK_IMPORTED_MODULE_3__["safeString"])(this.context.reviewComment)
    }, {
      selector: '.writeReview-form [name="email"]',
      validate: function validate(cb, val) {
        var result = _common_models_forms__WEBPACK_IMPORTED_MODULE_2__["default"].email(val);
        cb(result);
      },
      errorMessage: this.context.reviewEmail
    }]);
    return this.validator;
  };
  _proto.validate = function validate() {
    return this.validator.performCheck();
  };
  return _default;
}();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/product/video-gallery.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/product/video-gallery.js ***!
  \**************************************************/
/*! exports provided: VideoGallery, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoGallery", function() { return VideoGallery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return videoGallery; });
var VideoGallery = /*#__PURE__*/function () {
  function VideoGallery($element) {
    this.$player = $element.find('[data-video-player]');
    this.$videos = $element.find('[data-video-item]');
    this.currentVideo = {};
    this.bindEvents();
  }
  var _proto = VideoGallery.prototype;
  _proto.selectNewVideo = function selectNewVideo(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    this.currentVideo = {
      id: $target.data('videoId'),
      $selectedThumb: $target
    };
    this.setMainVideo();
    this.setActiveThumb();
  };
  _proto.setMainVideo = function setMainVideo() {
    this.$player.attr('src', "//www.youtube.com/embed/" + this.currentVideo.id);
  };
  _proto.setActiveThumb = function setActiveThumb() {
    this.$videos.removeClass('is-active');
    this.currentVideo.$selectedThumb.addClass('is-active');
  };
  _proto.bindEvents = function bindEvents() {
    this.$videos.on('click', this.selectNewVideo.bind(this));
  };
  return VideoGallery;
}();
function videoGallery() {
  var pluginKey = 'video-gallery';
  var $videoGallery = $("[data-" + pluginKey + "]");
  $videoGallery.each(function (index, element) {
    var $el = $(element);
    var isInitialized = $el.data(pluginKey) instanceof VideoGallery;
    if (isInitialized) {
      return;
    }
    $el.data(pluginKey, new VideoGallery($el));
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvYXJ0aXNhbi9wcm9kdWN0LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vbW9kZWxzL2Zvcm1zLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vdXRpbHMvZm9ybS11dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3V0aWxzL3NhZmUtc3RyaW5nLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9wcm9kdWN0LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9wcm9kdWN0L3Jldmlld3MuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL3Byb2R1Y3QvdmlkZW8tZ2FsbGVyeS5qcyJdLCJuYW1lcyI6WyJsb2FkZWQiLCIkIiwidGV4dCIsInRyaW0iLCJzaG93IiwiZWFjaCIsImZvcm1hdFJ1bGUiLCJwcmljZVJ1bGVzIiwicmVwbGFjZSIsInNwbGl0IiwiZm9ybWF0dGVkUnVsZSIsImh0bWwiLCJvbiIsImZvcm1Ub3AiLCJvZmZzZXQiLCJ0b3AiLCJoZWFkZXJIZWlnaHQiLCJoZWlnaHQiLCJ3aW5kb3ciLCJzY3JvbGxUb3AiLCJmb3JtcyIsImVtYWlsIiwidmFsdWUiLCJyZSIsInRlc3QiLCJwYXNzd29yZCIsIm5vdEVtcHR5IiwibGVuZ3RoIiwiaW5wdXRUYWdOYW1lcyIsImNyZWF0ZVBhc3N3b3JkVmFsaWRhdGlvbkVycm9yVGV4dE9iamVjdCIsImVtcHR5IiwiY29uZmlybSIsIm1pc21hdGNoIiwiaW52YWxpZCIsIm9uRW1wdHlQYXNzd29yZEVycm9yVGV4dCIsIm9uQ29uZmlybVBhc3N3b3JkRXJyb3JUZXh0Iiwib25NaXNtYXRjaFBhc3N3b3JkRXJyb3JUZXh0Iiwib25Ob3RWYWxpZFBhc3N3b3JkRXJyb3JUZXh0IiwiY2xhc3NpZnlJbnB1dCIsImlucHV0IiwiZm9ybUZpZWxkQ2xhc3MiLCIkaW5wdXQiLCIkZm9ybUZpZWxkIiwicGFyZW50IiwidGFnTmFtZSIsInByb3AiLCJ0b0xvd2VyQ2FzZSIsImNsYXNzTmFtZSIsInNwZWNpZmljQ2xhc3NOYW1lIiwiaW5wdXRUeXBlIiwiX2luY2x1ZGVzIiwiX2NhbWVsQ2FzZSIsIl9jYXBpdGFsaXplIiwiYWRkQ2xhc3MiLCJjbGFzc2lmeUZvcm0iLCJmb3JtU2VsZWN0b3IiLCJvcHRpb25zIiwiJGZvcm0iLCIkaW5wdXRzIiwiZmluZCIsImpvaW4iLCJfb3B0aW9ucyIsIl9vcHRpb25zJGZvcm1GaWVsZENsYSIsIl9fIiwiZ2V0RmllbGRJZCIsIiRmaWVsZCIsImZpZWxkSWQiLCJtYXRjaCIsImluc2VydFN0YXRlSGlkZGVuRmllbGQiLCIkc3RhdGVGaWVsZCIsInN0YXRlRmllbGRBdHRycyIsInR5cGUiLCJuYW1lIiwiYWZ0ZXIiLCJWYWxpZGF0b3JzIiwic2V0RW1haWxWYWxpZGF0aW9uIiwidmFsaWRhdG9yIiwiZmllbGQiLCJlcnJvclRleHQiLCJhZGQiLCJzZWxlY3RvciIsInZhbGlkYXRlIiwiY2IiLCJ2YWwiLCJyZXN1bHQiLCJlcnJvck1lc3NhZ2UiLCJzZXRQYXNzd29yZFZhbGlkYXRpb24iLCJwYXNzd29yZFNlbGVjdG9yIiwicGFzc3dvcmQyU2VsZWN0b3IiLCJyZXF1aXJlbWVudHMiLCJfcmVmIiwiaXNPcHRpb25hbCIsIiRwYXNzd29yZCIsInBhc3N3b3JkVmFsaWRhdGlvbnMiLCJSZWdFeHAiLCJhbHBoYSIsIm51bWVyaWMiLCJtaW5sZW5ndGgiLCJzZXRNaW5NYXhQcmljZVZhbGlkYXRpb24iLCJzZWxlY3RvcnMiLCJwcmljZVZhbGlkYXRpb25FcnJvclRleHRzIiwiZXJyb3JTZWxlY3RvciIsImZpZWxkc2V0U2VsZWN0b3IiLCJtYXhQcmljZVNlbGVjdG9yIiwibWluUHJpY2VTZWxlY3RvciIsIl9wcmljZVZhbGlkYXRpb25FcnJvciIsIm9uTWluUHJpY2VFcnJvciIsIm9uTWF4UHJpY2VFcnJvciIsIm1pblByaWNlTm90RW50ZXJlZCIsIm1heFByaWNlTm90RW50ZXJlZCIsIm9uSW52YWxpZFByaWNlIiwiY29uZmlndXJlIiwiZm9ybSIsInByZXZlbnRTdWJtaXQiLCJzdWNjZXNzQ2xhc3MiLCJzZXRNZXNzYWdlT3B0aW9ucyIsImVycm9yU3BhbiIsInNldFN0YXRlQ291bnRyeVZhbGlkYXRpb24iLCJjbGVhblVwU3RhdGVWYWxpZGF0aW9uIiwiJGZpZWxkQ2xhc3NFbGVtZW50IiwiZGF0YSIsIk9iamVjdCIsImtleXMiLCJub2QiLCJjbGFzc2VzIiwiZm9yRWFjaCIsImhhc0NsYXNzIiwicmVtb3ZlQ2xhc3MiLCJzYWZlU3RyaW5nIiwic3RyIiwiZCIsIkRPTVBhcnNlciIsInBhcnNlRnJvbVN0cmluZyIsImJvZHkiLCJ0ZXh0Q29udGVudCIsIldSSVRFX1JFVklFVyIsIm1vZGFsVHlwZXMiLCJQcm9kdWN0IiwiX1BhZ2VNYW5hZ2VyIiwiX2luaGVyaXRzTG9vc2UiLCJjb250ZXh0IiwiX3RoaXMiLCJjYWxsIiwidXJsIiwibG9jYXRpb24iLCJocmVmIiwiJHJldmlld0xpbmsiLCIkYnVsa1ByaWNpbmdMaW5rIiwicmV2aWV3TW9kYWwiLCJtb2RhbEZhY3RvcnkiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJvblJlYWR5IiwiX3RoaXMyIiwiZG9jdW1lbnQiLCJpbmRleE9mIiwiaGlzdG9yeSIsInJlcGxhY2VTdGF0ZSIsInRpdGxlIiwicGF0aG5hbWUiLCJjb2xsYXBzaWJsZUZhY3RvcnkiLCJwcm9kdWN0RGV0YWlscyIsIlByb2R1Y3REZXRhaWxzIiwiQkNEYXRhIiwicHJvZHVjdF9hdHRyaWJ1dGVzIiwic2V0UHJvZHVjdFZhcmlhbnQiLCJ2aWRlb0dhbGxlcnkiLCJidWxrUHJpY2luZ0hhbmRsZXIiLCIkcmV2aWV3Rm9ybSIsInJldmlldyIsIlJldmlldyIsInNldHVwRm9jdXNhYmxlRWxlbWVudHMiLCJyZWdpc3RlclZhbGlkYXRpb24iLCJhcmlhRGVzY3JpYmVSZXZpZXdJbnB1dHMiLCJwZXJmb3JtQ2hlY2siLCJhcmVBbGwiLCJhcnRpc2FuTG9hZGVkIiwicHJvZHVjdFJldmlld0hhbmRsZXIiLCJfIiwibXNnU3BhbklkIiwiYXR0ciIsInNpYmxpbmdzIiwidHJpZ2dlciIsIlBhZ2VNYW5hZ2VyIiwiX2RlZmF1bHQiLCJzdWJtaXQiLCIkcmV2aWV3c0NvbnRlbnQiLCIkY29sbGFwc2libGUiLCJpbml0TGlua0JpbmQiLCJpbmplY3RQYWdpbmF0aW9uTGluayIsImNvbGxhcHNlUmV2aWV3cyIsIiRjb250ZW50IiwiQ29sbGFwc2libGVFdmVudHMiLCJjbGljayIsImhhc2giLCIkbmV4dExpbmsiLCIkcHJldkxpbmsiLCJyZXZpZXdSYXRpbmciLCJyZXZpZXdTdWJqZWN0IiwicmV2aWV3Q29tbWVudCIsInJldmlld0VtYWlsIiwiVmlkZW9HYWxsZXJ5IiwiJGVsZW1lbnQiLCIkcGxheWVyIiwiJHZpZGVvcyIsImN1cnJlbnRWaWRlbyIsImJpbmRFdmVudHMiLCJzZWxlY3ROZXdWaWRlbyIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIiR0YXJnZXQiLCJjdXJyZW50VGFyZ2V0IiwiaWQiLCIkc2VsZWN0ZWRUaHVtYiIsInNldE1haW5WaWRlbyIsInNldEFjdGl2ZVRodW1iIiwiYmluZCIsInBsdWdpbktleSIsIiR2aWRlb0dhbGxlcnkiLCJpbmRleCIsImVsZW1lbnQiLCIkZWwiLCJpc0luaXRpYWxpemVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBdUI7QUFFUixTQUFTQSxNQUFNQSxDQUFBLEVBQUc7RUFDN0IsSUFBSUMsNkNBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDQyxJQUFJLENBQUMsQ0FBQyxDQUFDQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtJQUMvQ0YsNkNBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDRyxJQUFJLENBQUMsQ0FBQztFQUNuQzs7RUFFQTtFQUNBSCw2Q0FBQyxDQUFDLGtDQUFrQyxDQUFDLENBQUNJLElBQUksQ0FBQyxTQUFTQyxV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ZXJ5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9hZGVkKCkge1xuICAgIGlmICgkKCcjdGFiLXNwZWNpZmljYXRpb25zJykudGV4dCgpLnRyaW0oKSAhPT0gJycpIHtcbiAgICAgICAgJCgnLnRhYi1oZWFkaW5nLS1zcGVjcycpLnNob3coKTtcbiAgICB9XG5cbiAgICAvLyBidWxrIHByaWNpbmdcbiAgICAkKCcucHJvZHVjdFZpZXctaW5mby1idWxrUHJpY2luZyBsaScpLmVhY2goZnVuY3Rpb24gZm9ybWF0UnVsZSgpIHtcbiAgICAgICAgY29uc3QgcHJpY2VSdWxlcyA9ICQodGhpcykudGV4dCgpLnRyaW0oKS5yZXBsYWNlKC9cXHI/XFxufFxcci9nLCAnJykuc3BsaXQoLyguKikoYW5kIGdldCB8IGFuZCBwYXkgb25seSkvZ2kpO1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWRSdWxlID0gYDxzdHJvbmc+JHtwcmljZVJ1bGVzWzFdfTwvc3Ryb25nPiR7cHJpY2VSdWxlc1syXX08c3Ryb25nPjxzcGFuPiR7cHJpY2VSdWxlc1szXX08L3NwYW4+PC9zdHJvbmc+YDtcbiAgICAgICAgJCh0aGlzKS5odG1sKGZvcm1hdHRlZFJ1bGUpO1xuICAgIH0pO1xuXG4gICAgJCgnI2Zvcm0tYWN0aW9uLWFkZFRvQ2FydCcpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgZm9ybVRvcCA9ICQoJy5wcm9kdWN0Vmlldy1vcHRpb25zIGZvcm0nKS5vZmZzZXQoKS50b3A7XG4gICAgICAgIGNvbnN0IGhlYWRlckhlaWdodCA9ICQoJy5oZWFkZXInKS5oZWlnaHQoKTtcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbFRvcChmb3JtVG9wIC0gaGVhZGVySGVpZ2h0KTtcbiAgICB9KTtcbn1cbiIsImNvbnN0IGZvcm1zID0ge1xuICAgIGVtYWlsKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHJlID0gL14uK0AuK1xcLi4rLztcbiAgICAgICAgcmV0dXJuIHJlLnRlc3QodmFsdWUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZXMgYSBwYXNzd29yZCBmaWVsZFxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHBhc3N3b3JkKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vdEVtcHR5KHZhbHVlKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogdmFsaWRhdGVzIGlmIGEgZmllbGQgaXMgZW1wdHlcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKlxuICAgICAqL1xuICAgIG5vdEVtcHR5KHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5sZW5ndGggPiAwO1xuICAgIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmb3JtcztcbiIsImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgbm9kIGZyb20gJy4uL25vZCc7XG5pbXBvcnQgZm9ybXMgZnJvbSAnLi4vbW9kZWxzL2Zvcm1zJztcblxuY29uc3QgaW5wdXRUYWdOYW1lcyA9IFtcbiAgICAnaW5wdXQnLFxuICAgICdzZWxlY3QnLFxuICAgICd0ZXh0YXJlYScsXG5dO1xuLyoqXG4gKiBTZXQgdXAgT2JqZWN0IHdpdGggRXJyb3IgTWVzc2FnZXMgb24gUGFzc3dvcmQgVmFsaWRhdGlvbi4gUGxlYXNlIHVzZSBtZXNzYWdlcyBpbiBtZW50aW9uZWQgb3JkZXJcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbXB0eSBkZWZpbmVzIGVycm9yIHRleHQgZm9yIGVtcHR5IGZpZWxkXG4gKiBAcGFyYW0ge3N0cmluZ30gY29uZmlybSBkZWZpbmVzIGVycm9yIHRleHQgZm9yIGVtcHR5IGNvbmZpcm1hdGlvbiBmaWVsZFxuICogQHBhcmFtIHtzdHJpbmd9IG1pc21hdGNoIGRlZmluZXMgZXJyb3IgdGV4dCBpZiBjb25maXJtIHBhc3Nmb3JkIG1pc21hdGNoZXMgcGFzc2ZvcmQgZmllbGRcbiAqIEBwYXJhbSB7c3RyaW5nfSBpbnZhbGlkIGRlZmluZXMgZXJyb3IgdGV4dCBmb3IgaW52YWxpZCBwYXNzd29yZCBjaGFyYXRlcnMgc2VxdWVuY2VcbiAqIEByZXR1cm4ge29iamVjdH0gbWVzc2FnZXMgb3IgZGVmYXVsdCB0ZXh0cyBpZiBub3RoaW5nIGlzIHByb3ZpZGluZ1xuICovXG5leHBvcnQgY29uc3QgY3JlYXRlUGFzc3dvcmRWYWxpZGF0aW9uRXJyb3JUZXh0T2JqZWN0ID0gKGVtcHR5LCBjb25maXJtLCBtaXNtYXRjaCwgaW52YWxpZCkgPT4gKHtcbiAgICBvbkVtcHR5UGFzc3dvcmRFcnJvclRleHQ6IGVtcHR5LFxuICAgIG9uQ29uZmlybVBhc3N3b3JkRXJyb3JUZXh0OiBjb25maXJtLFxuICAgIG9uTWlzbWF0Y2hQYXNzd29yZEVycm9yVGV4dDogbWlzbWF0Y2gsXG4gICAgb25Ob3RWYWxpZFBhc3N3b3JkRXJyb3JUZXh0OiBpbnZhbGlkLFxufSk7XG5cblxuLyoqXG4gKiBBcHBseSBjbGFzcyBuYW1lIHRvIGFuIGlucHV0IGVsZW1lbnQgb24gaXRzIHR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBpbnB1dFxuICogQHBhcmFtIHtzdHJpbmd9IGZvcm1GaWVsZENsYXNzXG4gKiBAcmV0dXJuIHtvYmplY3R9IEVsZW1lbnQgaXRzZWxmXG4gKi9cbmZ1bmN0aW9uIGNsYXNzaWZ5SW5wdXQoaW5wdXQsIGZvcm1GaWVsZENsYXNzKSB7XG4gICAgY29uc3QgJGlucHV0ID0gJChpbnB1dCk7XG4gICAgY29uc3QgJGZvcm1GaWVsZCA9ICRpbnB1dC5wYXJlbnQoYC4ke2Zvcm1GaWVsZENsYXNzfWApO1xuICAgIGNvbnN0IHRhZ05hbWUgPSAkaW5wdXQucHJvcCgndGFnTmFtZScpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBsZXQgY2xhc3NOYW1lID0gYCR7Zm9ybUZpZWxkQ2xhc3N9LS0ke3RhZ05hbWV9YDtcbiAgICBsZXQgc3BlY2lmaWNDbGFzc05hbWU7XG5cbiAgICAvLyBJbnB1dCBjYW4gYmUgdGV4dC9jaGVja2JveC9yYWRpbyBldGMuLi5cbiAgICBpZiAodGFnTmFtZSA9PT0gJ2lucHV0Jykge1xuICAgICAgICBjb25zdCBpbnB1dFR5cGUgPSAkaW5wdXQucHJvcCgndHlwZScpO1xuXG4gICAgICAgIGlmIChfLmluY2x1ZGVzKFsncmFkaW8nLCAnY2hlY2tib3gnLCAnc3VibWl0J10sIGlucHV0VHlwZSkpIHtcbiAgICAgICAgICAgIC8vIGllOiAuZm9ybS1maWVsZC0tY2hlY2tib3gsIC5mb3JtLWZpZWxkLS1yYWRpb1xuICAgICAgICAgICAgY2xhc3NOYW1lID0gYCR7Zm9ybUZpZWxkQ2xhc3N9LS0ke18uY2FtZWxDYXNlKGlucHV0VHlwZSl9YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGllOiAuZm9ybS1maWVsZC0taW5wdXQgLmZvcm0tZmllbGQtLWlucHV0VGV4dFxuICAgICAgICAgICAgc3BlY2lmaWNDbGFzc05hbWUgPSBgJHtjbGFzc05hbWV9JHtfLmNhcGl0YWxpemUoaW5wdXRUeXBlKX1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQXBwbHkgY2xhc3MgbW9kaWZpZXJcbiAgICByZXR1cm4gJGZvcm1GaWVsZFxuICAgICAgICAuYWRkQ2xhc3MoY2xhc3NOYW1lKVxuICAgICAgICAuYWRkQ2xhc3Moc3BlY2lmaWNDbGFzc05hbWUpO1xufVxuXG4vKipcbiAqIEFwcGx5IGNsYXNzIG5hbWUgdG8gZWFjaCBpbnB1dCBlbGVtZW50IGluIGEgZm9ybSBiYXNlZCBvbiBpdHMgdHlwZVxuICogQGV4YW1wbGVcbiAqIC8vIEJlZm9yZVxuICogPGZvcm0gaWQ9XCJmb3JtXCI+XG4gKiAgICAgPGRpdiBjbGFzcz1cImZvcm0tZmllbGRcIj5cbiAqICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCI+XG4gKiAgICAgPC9kaXY+XG4gKiAgICAgPGRpdiBjbGFzcz1cImZvcm0tZmllbGRcIj5cbiAqICAgICAgICAgPHNlbGVjdD4uLi48L3NlbGVjdD5cbiAqICAgICA8L2Rpdj5cbiAqIDwvZm9ybT5cbiAqXG4gKiBjbGFzc2lmeUZvcm0oJyNmb3JtJywgeyBmb3JtRmllbGRDbGFzczogJ2Zvcm0tZmllbGQnIH0pO1xuICpcbiAqIC8vIEFmdGVyXG4gKiA8ZGl2IGNsYXNzPVwiZm9ybS1maWVsZCBmb3JtLWZpZWxkLS1pbnB1dCBmb3JtLWZpZWxkLS1pbnB1dFRleHRcIj4uLi48L2Rpdj5cbiAqIDxkaXYgY2xhc3M9XCJmb3JtLWZpZWxkIGZvcm0tZmllbGQtLXNlbGVjdFwiPi4uLjwvZGl2PlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gZm9ybVNlbGVjdG9yIC0gc2VsZWN0b3Igb3IgZWxlbWVudFxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge2pRdWVyeX0gRWxlbWVudCBpdHNlbGZcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsYXNzaWZ5Rm9ybShmb3JtU2VsZWN0b3IsIG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0ICRmb3JtID0gJChmb3JtU2VsZWN0b3IpO1xuICAgIGNvbnN0ICRpbnB1dHMgPSAkZm9ybS5maW5kKGlucHV0VGFnTmFtZXMuam9pbignLCAnKSk7XG5cbiAgICAvLyBPYnRhaW4gb3B0aW9uc1xuICAgIGNvbnN0IHsgZm9ybUZpZWxkQ2xhc3MgPSAnZm9ybS1maWVsZCcgfSA9IG9wdGlvbnM7XG5cbiAgICAvLyBDbGFzc2lmeSBlYWNoIGlucHV0IGluIGEgZm9ybVxuICAgICRpbnB1dHMuZWFjaCgoX18sIGlucHV0KSA9PiB7XG4gICAgICAgIGNsYXNzaWZ5SW5wdXQoaW5wdXQsIGZvcm1GaWVsZENsYXNzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiAkZm9ybTtcbn1cblxuLyoqXG4gKiBHZXQgaWQgZnJvbSBnaXZlbiBmaWVsZFxuICogQHBhcmFtIHtvYmplY3R9ICRmaWVsZCBKUXVlcnkgZmllbGQgb2JqZWN0XG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldEZpZWxkSWQoJGZpZWxkKSB7XG4gICAgY29uc3QgZmllbGRJZCA9ICRmaWVsZC5wcm9wKCduYW1lJykubWF0Y2goLyhcXFsuKlxcXSkvKTtcblxuICAgIGlmIChmaWVsZElkICYmIGZpZWxkSWQubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIHJldHVybiBmaWVsZElkWzBdO1xuICAgIH1cblxuICAgIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBJbnNlcnQgaGlkZGVuIGZpZWxkIGFmdGVyIFN0YXRlL1Byb3ZpbmNlIGZpZWxkXG4gKiBAcGFyYW0ge29iamVjdH0gJHN0YXRlRmllbGQgSlF1ZXJ5IGZpZWxkIG9iamVjdFxuICovXG5mdW5jdGlvbiBpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkKCRzdGF0ZUZpZWxkKSB7XG4gICAgY29uc3QgZmllbGRJZCA9IGdldEZpZWxkSWQoJHN0YXRlRmllbGQpO1xuICAgIGNvbnN0IHN0YXRlRmllbGRBdHRycyA9IHtcbiAgICAgICAgdHlwZTogJ2hpZGRlbicsXG4gICAgICAgIG5hbWU6IGBGb3JtRmllbGRJc1RleHQke2ZpZWxkSWR9YCxcbiAgICAgICAgdmFsdWU6ICcxJyxcbiAgICB9O1xuXG4gICAgJHN0YXRlRmllbGQuYWZ0ZXIoJCgnPGlucHV0IC8+Jywgc3RhdGVGaWVsZEF0dHJzKSk7XG59XG5cbmNvbnN0IFZhbGlkYXRvcnMgPSB7XG4gICAgLyoqXG4gICAgICogU2V0cyB1cCBhIG5ldyB2YWxpZGF0aW9uIHdoZW4gdGhlIGZvcm0gaXMgZGlydHlcbiAgICAgKiBAcGFyYW0gdmFsaWRhdG9yXG4gICAgICogQHBhcmFtIGZpZWxkXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVycm9yVGV4dCBkZXNjcmliZXMgZXJyb3JNYXNzYWdlIG9uIGVtYWlsIHZhbGlkYXRpb25cbiAgICAgKi9cbiAgICBzZXRFbWFpbFZhbGlkYXRpb246ICh2YWxpZGF0b3IsIGZpZWxkLCBlcnJvclRleHQpID0+IHtcbiAgICAgICAgaWYgKGZpZWxkKSB7XG4gICAgICAgICAgICB2YWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogZmllbGQsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGZvcm1zLmVtYWlsKHZhbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogZXJyb3JUZXh0LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGUgcGFzc3dvcmQgZmllbGRzXG4gICAgICogQHBhcmFtIHZhbGlkYXRvclxuICAgICAqIEBwYXJhbSBwYXNzd29yZFNlbGVjdG9yXG4gICAgICogQHBhcmFtIHBhc3N3b3JkMlNlbGVjdG9yXG4gICAgICogQHBhcmFtIHJlcXVpcmVtZW50c1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBlcnJvclRleHRzT2JqZWN0XG4gICAgICogQHBhcmFtIGlzT3B0aW9uYWxcbiAgICAgKi9cbiAgICBzZXRQYXNzd29yZFZhbGlkYXRpb246ICh2YWxpZGF0b3IsIHBhc3N3b3JkU2VsZWN0b3IsIHBhc3N3b3JkMlNlbGVjdG9yLCByZXF1aXJlbWVudHMsIHtcbiAgICAgICAgb25FbXB0eVBhc3N3b3JkRXJyb3JUZXh0LCBvbkNvbmZpcm1QYXNzd29yZEVycm9yVGV4dCwgb25NaXNtYXRjaFBhc3N3b3JkRXJyb3JUZXh0LCBvbk5vdFZhbGlkUGFzc3dvcmRFcnJvclRleHQsXG4gICAgfSwgaXNPcHRpb25hbCkgPT4ge1xuICAgICAgICBjb25zdCAkcGFzc3dvcmQgPSAkKHBhc3N3b3JkU2VsZWN0b3IpO1xuICAgICAgICBjb25zdCBwYXNzd29yZFZhbGlkYXRpb25zID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBwYXNzd29yZFNlbGVjdG9yLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc09wdGlvbmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2IodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBvbkVtcHR5UGFzc3dvcmRFcnJvclRleHQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBwYXNzd29yZFNlbGVjdG9yLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwubWF0Y2gobmV3IFJlZ0V4cChyZXF1aXJlbWVudHMuYWxwaGEpKVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgdmFsLm1hdGNoKG5ldyBSZWdFeHAocmVxdWlyZW1lbnRzLm51bWVyaWMpKVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgdmFsLmxlbmd0aCA+PSByZXF1aXJlbWVudHMubWlubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIG9wdGlvbmFsIGFuZCBub3RoaW5nIGVudGVyZWQsIGl0IGlzIHZhbGlkXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc09wdGlvbmFsICYmIHZhbC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYih0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IG9uTm90VmFsaWRQYXNzd29yZEVycm9yVGV4dCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IHBhc3N3b3JkMlNlbGVjdG9yLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc09wdGlvbmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2IodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBvbkNvbmZpcm1QYXNzd29yZEVycm9yVGV4dCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IHBhc3N3b3JkMlNlbGVjdG9yLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwgPT09ICRwYXNzd29yZC52YWwoKTtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBvbk1pc21hdGNoUGFzc3dvcmRFcnJvclRleHQsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdO1xuXG4gICAgICAgIHZhbGlkYXRvci5hZGQocGFzc3dvcmRWYWxpZGF0aW9ucyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIHBhc3N3b3JkIGZpZWxkc1xuICAgICAqIEBwYXJhbSB7Tm9kfSB2YWxpZGF0b3JcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc2VsZWN0b3JzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9ycy5lcnJvclNlbGVjdG9yXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9ycy5maWVsZHNldFNlbGVjdG9yXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9ycy5mb3JtU2VsZWN0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JzLm1heFByaWNlU2VsZWN0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JzLm1pblByaWNlU2VsZWN0b3JcbiAgICAgKi9cbiAgICBzZXRNaW5NYXhQcmljZVZhbGlkYXRpb246ICh2YWxpZGF0b3IsIHNlbGVjdG9ycywgcHJpY2VWYWxpZGF0aW9uRXJyb3JUZXh0cyA9IHt9KSA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGVycm9yU2VsZWN0b3IsXG4gICAgICAgICAgICBmaWVsZHNldFNlbGVjdG9yLFxuICAgICAgICAgICAgZm9ybVNlbGVjdG9yLFxuICAgICAgICAgICAgbWF4UHJpY2VTZWxlY3RvcixcbiAgICAgICAgICAgIG1pblByaWNlU2VsZWN0b3IsXG4gICAgICAgIH0gPSBzZWxlY3RvcnM7XG5cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG9iamVjdC1jdXJseS1uZXdsaW5lXG4gICAgICAgIGNvbnN0IHsgb25NaW5QcmljZUVycm9yLCBvbk1heFByaWNlRXJyb3IsIG1pblByaWNlTm90RW50ZXJlZCwgbWF4UHJpY2VOb3RFbnRlcmVkLCBvbkludmFsaWRQcmljZSB9ID0gcHJpY2VWYWxpZGF0aW9uRXJyb3JUZXh0cztcblxuICAgICAgICB2YWxpZGF0b3IuY29uZmlndXJlKHtcbiAgICAgICAgICAgIGZvcm06IGZvcm1TZWxlY3RvcixcbiAgICAgICAgICAgIHByZXZlbnRTdWJtaXQ6IHRydWUsXG4gICAgICAgICAgICBzdWNjZXNzQ2xhc3M6ICdfJywgLy8gS0xVREdFOiBEb24ndCBhcHBseSBzdWNjZXNzIGNsYXNzXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBvbk1pblByaWNlRXJyb3IsXG4gICAgICAgICAgICBzZWxlY3RvcjogbWluUHJpY2VTZWxlY3RvcixcbiAgICAgICAgICAgIHZhbGlkYXRlOiBgbWluLW1heDoke21pblByaWNlU2VsZWN0b3J9OiR7bWF4UHJpY2VTZWxlY3Rvcn1gLFxuICAgICAgICB9KTtcblxuICAgICAgICB2YWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogb25NYXhQcmljZUVycm9yLFxuICAgICAgICAgICAgc2VsZWN0b3I6IG1heFByaWNlU2VsZWN0b3IsXG4gICAgICAgICAgICB2YWxpZGF0ZTogYG1pbi1tYXg6JHttaW5QcmljZVNlbGVjdG9yfToke21heFByaWNlU2VsZWN0b3J9YCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IG1heFByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICAgIHNlbGVjdG9yOiBtYXhQcmljZVNlbGVjdG9yLFxuICAgICAgICAgICAgdmFsaWRhdGU6ICdwcmVzZW5jZScsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBtaW5QcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICBzZWxlY3RvcjogbWluUHJpY2VTZWxlY3RvcixcbiAgICAgICAgICAgIHZhbGlkYXRlOiAncHJlc2VuY2UnLFxuICAgICAgICB9KTtcblxuICAgICAgICB2YWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogb25JbnZhbGlkUHJpY2UsXG4gICAgICAgICAgICBzZWxlY3RvcjogW21pblByaWNlU2VsZWN0b3IsIG1heFByaWNlU2VsZWN0b3JdLFxuICAgICAgICAgICAgdmFsaWRhdGU6ICdtaW4tbnVtYmVyOjAnLFxuICAgICAgICB9KTtcblxuICAgICAgICB2YWxpZGF0b3Iuc2V0TWVzc2FnZU9wdGlvbnMoe1xuICAgICAgICAgICAgc2VsZWN0b3I6IFttaW5QcmljZVNlbGVjdG9yLCBtYXhQcmljZVNlbGVjdG9yXSxcbiAgICAgICAgICAgIHBhcmVudDogZmllbGRzZXRTZWxlY3RvcixcbiAgICAgICAgICAgIGVycm9yU3BhbjogZXJyb3JTZWxlY3RvcixcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgdXAgYSBuZXcgdmFsaWRhdGlvbiB3aGVuIHRoZSBmb3JtIGlzIGRpcnR5XG4gICAgICogQHBhcmFtIHZhbGlkYXRvclxuICAgICAqIEBwYXJhbSBmaWVsZFxuICAgICAqL1xuICAgIHNldFN0YXRlQ291bnRyeVZhbGlkYXRpb246ICh2YWxpZGF0b3IsIGZpZWxkLCBlcnJvclRleHQpID0+IHtcbiAgICAgICAgaWYgKGZpZWxkKSB7XG4gICAgICAgICAgICB2YWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogZmllbGQsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6ICdwcmVzZW5jZScsXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBlcnJvclRleHQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGNsYXNzZXMgZnJvbSBkaXJ0eSBmb3JtIGlmIHByZXZpb3VzbHkgY2hlY2tlZFxuICAgICAqIEBwYXJhbSBmaWVsZFxuICAgICAqL1xuICAgIGNsZWFuVXBTdGF0ZVZhbGlkYXRpb246IChmaWVsZCkgPT4ge1xuICAgICAgICBjb25zdCAkZmllbGRDbGFzc0VsZW1lbnQgPSAkKChgW2RhdGEtdHlwZT1cIiR7ZmllbGQuZGF0YSgnZmllbGRUeXBlJyl9XCJdYCkpO1xuXG4gICAgICAgIE9iamVjdC5rZXlzKG5vZC5jbGFzc2VzKS5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCRmaWVsZENsYXNzRWxlbWVudC5oYXNDbGFzcyhub2QuY2xhc3Nlc1t2YWx1ZV0pKSB7XG4gICAgICAgICAgICAgICAgJGZpZWxkQ2xhc3NFbGVtZW50LnJlbW92ZUNsYXNzKG5vZC5jbGFzc2VzW3ZhbHVlXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG59O1xuXG5leHBvcnQgeyBWYWxpZGF0b3JzLCBpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkIH07XG4iLCIvKipcbiAqIFRoaXMgZnVuY3Rpb24gcGFyc2VzIEhUTUwgZW50aXRpZXMgaW4gc3RyaW5nc1xuICogQHBhcmFtIHN0cjogU3RyaW5nXG4gKiBAcmV0dXJucyBTdHJpbmdcbiovXG5leHBvcnQgY29uc3Qgc2FmZVN0cmluZyA9IChzdHIpID0+IHtcbiAgICBjb25zdCBkID0gbmV3IERPTVBhcnNlcigpO1xuICAgIHJldHVybiBkLnBhcnNlRnJvbVN0cmluZyhzdHIsICd0ZXh0L2h0bWwnKS5ib2R5LnRleHRDb250ZW50O1xufTtcbiIsIi8qXG4gSW1wb3J0IGFsbCBwcm9kdWN0IHNwZWNpZmljIGpzXG4gKi9cbmltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XG5pbXBvcnQgUmV2aWV3IGZyb20gJy4vcHJvZHVjdC9yZXZpZXdzJztcbmltcG9ydCBjb2xsYXBzaWJsZUZhY3RvcnkgZnJvbSAnLi9jb21tb24vY29sbGFwc2libGUnO1xuaW1wb3J0IFByb2R1Y3REZXRhaWxzIGZyb20gJy4vY29tbW9uL3Byb2R1Y3QtZGV0YWlscyc7XG5pbXBvcnQgdmlkZW9HYWxsZXJ5IGZyb20gJy4vcHJvZHVjdC92aWRlby1nYWxsZXJ5JztcbmltcG9ydCBhcnRpc2FuTG9hZGVkIGZyb20gJy4vYXJ0aXNhbi9wcm9kdWN0JztcbmltcG9ydCB7IGNsYXNzaWZ5Rm9ybSB9IGZyb20gJy4vY29tbW9uL3V0aWxzL2Zvcm0tdXRpbHMnO1xuaW1wb3J0IG1vZGFsRmFjdG9yeSwgeyBtb2RhbFR5cGVzIH0gZnJvbSAnLi9nbG9iYWwvbW9kYWwnO1xuXG5jb25zdCB7IFdSSVRFX1JFVklFVyB9ID0gbW9kYWxUeXBlcztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvZHVjdCBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKGNvbnRleHQpO1xuICAgICAgICB0aGlzLnVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgICAgICB0aGlzLiRyZXZpZXdMaW5rID0gJCgnW2RhdGEtcmV2ZWFsLWlkPVwibW9kYWwtcmV2aWV3LWZvcm1cIl0nKTtcbiAgICAgICAgdGhpcy4kYnVsa1ByaWNpbmdMaW5rID0gJCgnW2RhdGEtcmV2ZWFsLWlkPVwibW9kYWwtYnVsay1wcmljaW5nXCJdJyk7XG4gICAgICAgIHRoaXMucmV2aWV3TW9kYWwgPSBtb2RhbEZhY3RvcnkoJyNtb2RhbC1yZXZpZXctZm9ybScpWzBdO1xuICAgIH1cblxuICAgIG9uUmVhZHkoKSB7XG4gICAgICAgIC8vIExpc3RlbiBmb3IgZm91bmRhdGlvbiBtb2RhbCBjbG9zZSBldmVudHMgdG8gc2FuaXRpemUgVVJMIGFmdGVyIHJldmlldy5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ2Nsb3NlLmZuZHRuLnJldmVhbCcsICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnVybC5pbmRleE9mKCcjd3JpdGVfcmV2aWV3JykgIT09IC0xICYmIHR5cGVvZiB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgZG9jdW1lbnQudGl0bGUsIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCB2YWxpZGF0b3I7XG5cbiAgICAgICAgLy8gSW5pdCBjb2xsYXBzaWJsZVxuICAgICAgICBjb2xsYXBzaWJsZUZhY3RvcnkoKTtcblxuICAgICAgICB0aGlzLnByb2R1Y3REZXRhaWxzID0gbmV3IFByb2R1Y3REZXRhaWxzKCQoJy5wcm9kdWN0VmlldycpLCB0aGlzLmNvbnRleHQsIHdpbmRvdy5CQ0RhdGEucHJvZHVjdF9hdHRyaWJ1dGVzKTtcbiAgICAgICAgdGhpcy5wcm9kdWN0RGV0YWlscy5zZXRQcm9kdWN0VmFyaWFudCgpO1xuXG4gICAgICAgIHZpZGVvR2FsbGVyeSgpO1xuXG4gICAgICAgIHRoaXMuYnVsa1ByaWNpbmdIYW5kbGVyKCk7XG5cbiAgICAgICAgY29uc3QgJHJldmlld0Zvcm0gPSBjbGFzc2lmeUZvcm0oJy53cml0ZVJldmlldy1mb3JtJyk7XG5cbiAgICAgICAgaWYgKCRyZXZpZXdGb3JtLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IHJldmlldyA9IG5ldyBSZXZpZXcoJHJldmlld0Zvcm0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdvcGVuZWQuZm5kdG4ucmV2ZWFsJywgJyNtb2RhbC1yZXZpZXctZm9ybScsICgpID0+IHRoaXMucmV2aWV3TW9kYWwuc2V0dXBGb2N1c2FibGVFbGVtZW50cyhXUklURV9SRVZJRVcpKTtcblxuICAgICAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJ1tkYXRhLXJldmVhbC1pZD1cIm1vZGFsLXJldmlldy1mb3JtXCJdJywgKCkgPT4ge1xuICAgICAgICAgICAgdmFsaWRhdG9yID0gcmV2aWV3LnJlZ2lzdGVyVmFsaWRhdGlvbih0aGlzLmNvbnRleHQpO1xuICAgICAgICAgICAgdGhpcy5hcmlhRGVzY3JpYmVSZXZpZXdJbnB1dHMoJHJldmlld0Zvcm0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkcmV2aWV3Rm9ybS5vbignc3VibWl0JywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbGlkYXRvcikge1xuICAgICAgICAgICAgICAgIHZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsaWRhdG9yLmFyZUFsbCgndmFsaWQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgYXJ0aXNhbkxvYWRlZCgpO1xuXG4gICAgICAgIHRoaXMucHJvZHVjdFJldmlld0hhbmRsZXIoKTtcbiAgICB9XG5cbiAgICBhcmlhRGVzY3JpYmVSZXZpZXdJbnB1dHMoJGZvcm0pIHtcbiAgICAgICAgJGZvcm0uZmluZCgnW2RhdGEtaW5wdXRdJykuZWFjaCgoXywgaW5wdXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRpbnB1dCA9ICQoaW5wdXQpO1xuICAgICAgICAgICAgY29uc3QgbXNnU3BhbklkID0gYCR7JGlucHV0LmF0dHIoJ25hbWUnKX0tbXNnYDtcblxuICAgICAgICAgICAgJGlucHV0LnNpYmxpbmdzKCdzcGFuJykuYXR0cignaWQnLCBtc2dTcGFuSWQpO1xuICAgICAgICAgICAgJGlucHV0LmF0dHIoJ2FyaWEtZGVzY3JpYmVkYnknLCBtc2dTcGFuSWQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm9kdWN0UmV2aWV3SGFuZGxlcigpIHtcbiAgICAgICAgaWYgKHRoaXMudXJsLmluZGV4T2YoJyN3cml0ZV9yZXZpZXcnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuJHJldmlld0xpbmsudHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJ1bGtQcmljaW5nSGFuZGxlcigpIHtcbiAgICAgICAgaWYgKHRoaXMudXJsLmluZGV4T2YoJyNidWxrX3ByaWNpbmcnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuJGJ1bGtQcmljaW5nTGluay50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IG5vZCBmcm9tICcuLi9jb21tb24vbm9kJztcbmltcG9ydCB7IENvbGxhcHNpYmxlRXZlbnRzIH0gZnJvbSAnLi4vY29tbW9uL2NvbGxhcHNpYmxlJztcbmltcG9ydCBmb3JtcyBmcm9tICcuLi9jb21tb24vbW9kZWxzL2Zvcm1zJztcbmltcG9ydCB7IHNhZmVTdHJpbmcgfSBmcm9tICcuLi9jb21tb24vdXRpbHMvc2FmZS1zdHJpbmcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoJHJldmlld0Zvcm0pIHtcbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBub2Qoe1xuICAgICAgICAgICAgc3VibWl0OiAkcmV2aWV3Rm9ybS5maW5kKCdpbnB1dFt0eXBlPVwic3VibWl0XCJdJyksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuJHJldmlld3NDb250ZW50ID0gJCgnI3Byb2R1Y3QtcmV2aWV3cycpO1xuICAgICAgICB0aGlzLiRjb2xsYXBzaWJsZSA9ICQoJ1tkYXRhLWNvbGxhcHNpYmxlXScsIHRoaXMuJHJldmlld3NDb250ZW50KTtcblxuICAgICAgICB0aGlzLmluaXRMaW5rQmluZCgpO1xuICAgICAgICB0aGlzLmluamVjdFBhZ2luYXRpb25MaW5rKCk7XG4gICAgICAgIHRoaXMuY29sbGFwc2VSZXZpZXdzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT24gaW5pdGlhbCBwYWdlIGxvYWQsIHRoZSB1c2VyIGNsaWNrcyBvbiBcIigxMiBSZXZpZXdzKVwiIGxpbmtcbiAgICAgKiBUaGUgYnJvd3NlciBqdW1wcyB0byB0aGUgcmV2aWV3IHBhZ2UgYW5kIHNob3VsZCBleHBhbmQgdGhlIHJldmlld3Mgc2VjdGlvblxuICAgICAqL1xuICAgIGluaXRMaW5rQmluZCgpIHtcbiAgICAgICAgY29uc3QgJGNvbnRlbnQgPSAkKCcjcHJvZHVjdFJldmlld3MtY29udGVudCcsIHRoaXMuJHJldmlld3NDb250ZW50KTtcblxuICAgICAgICAkKCcjcHJvZHVjdFJldmlld19saW5rJykub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgJCgnLnByb2R1Y3RWaWV3LXJldmlld1RhYkxpbmsnKS50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICAgICAgaWYgKCEkY29udGVudC5oYXNDbGFzcygnaXMtb3BlbicpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kY29sbGFwc2libGUudHJpZ2dlcihDb2xsYXBzaWJsZUV2ZW50cy5jbGljayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbGxhcHNlUmV2aWV3cygpIHtcbiAgICAgICAgLy8gV2UncmUgaW4gcGFnaW5hdGluZyBzdGF0ZSwgZG8gbm90IGNvbGxhcHNlXG4gICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uaGFzaCAmJiB3aW5kb3cubG9jYXRpb24uaGFzaC5pbmRleE9mKCcjcHJvZHVjdC1yZXZpZXdzJykgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZvcmNlIGNvbGxhcHNlIG9uIHBhZ2UgbG9hZFxuICAgICAgICB0aGlzLiRjb2xsYXBzaWJsZS50cmlnZ2VyKENvbGxhcHNpYmxlRXZlbnRzLmNsaWNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbmplY3QgSUQgaW50byB0aGUgcGFnaW5hdGlvbiBsaW5rXG4gICAgICovXG4gICAgaW5qZWN0UGFnaW5hdGlvbkxpbmsoKSB7XG4gICAgICAgIGNvbnN0ICRuZXh0TGluayA9ICQoJy5wYWdpbmF0aW9uLWl0ZW0tLW5leHQgLnBhZ2luYXRpb24tbGluaycsIHRoaXMuJHJldmlld3NDb250ZW50KTtcbiAgICAgICAgY29uc3QgJHByZXZMaW5rID0gJCgnLnBhZ2luYXRpb24taXRlbS0tcHJldmlvdXMgLnBhZ2luYXRpb24tbGluaycsIHRoaXMuJHJldmlld3NDb250ZW50KTtcblxuICAgICAgICBpZiAoJG5leHRMaW5rLmxlbmd0aCkge1xuICAgICAgICAgICAgJG5leHRMaW5rLmF0dHIoJ2hyZWYnLCBgJHskbmV4dExpbmsuYXR0cignaHJlZicpfSAjcHJvZHVjdC1yZXZpZXdzYCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJHByZXZMaW5rLmxlbmd0aCkge1xuICAgICAgICAgICAgJHByZXZMaW5rLmF0dHIoJ2hyZWYnLCBgJHskcHJldkxpbmsuYXR0cignaHJlZicpfSAjcHJvZHVjdC1yZXZpZXdzYCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWdpc3RlclZhbGlkYXRpb24oY29udGV4dCkge1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLnZhbGlkYXRvci5hZGQoW3tcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnW25hbWU9XCJyZXZyYXRpbmdcIl0nLFxuICAgICAgICAgICAgdmFsaWRhdGU6ICdwcmVzZW5jZScsXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHNhZmVTdHJpbmcodGhpcy5jb250ZXh0LnJldmlld1JhdGluZyksXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnW25hbWU9XCJyZXZ0aXRsZVwiXScsXG4gICAgICAgICAgICB2YWxpZGF0ZTogJ3ByZXNlbmNlJyxcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogc2FmZVN0cmluZyh0aGlzLmNvbnRleHQucmV2aWV3U3ViamVjdCksXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnW25hbWU9XCJyZXZ0ZXh0XCJdJyxcbiAgICAgICAgICAgIHZhbGlkYXRlOiAncHJlc2VuY2UnLFxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBzYWZlU3RyaW5nKHRoaXMuY29udGV4dC5yZXZpZXdDb21tZW50KSxcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgc2VsZWN0b3I6ICcud3JpdGVSZXZpZXctZm9ybSBbbmFtZT1cImVtYWlsXCJdJyxcbiAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGZvcm1zLmVtYWlsKHZhbCk7XG4gICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5yZXZpZXdFbWFpbCxcbiAgICAgICAgfV0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvcjtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBWaWRlb0dhbGxlcnkge1xuICAgIGNvbnN0cnVjdG9yKCRlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuJHBsYXllciA9ICRlbGVtZW50LmZpbmQoJ1tkYXRhLXZpZGVvLXBsYXllcl0nKTtcbiAgICAgICAgdGhpcy4kdmlkZW9zID0gJGVsZW1lbnQuZmluZCgnW2RhdGEtdmlkZW8taXRlbV0nKTtcbiAgICAgICAgdGhpcy5jdXJyZW50VmlkZW8gPSB7fTtcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgc2VsZWN0TmV3VmlkZW8oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgJHRhcmdldCA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcblxuICAgICAgICB0aGlzLmN1cnJlbnRWaWRlbyA9IHtcbiAgICAgICAgICAgIGlkOiAkdGFyZ2V0LmRhdGEoJ3ZpZGVvSWQnKSxcbiAgICAgICAgICAgICRzZWxlY3RlZFRodW1iOiAkdGFyZ2V0LFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuc2V0TWFpblZpZGVvKCk7XG4gICAgICAgIHRoaXMuc2V0QWN0aXZlVGh1bWIoKTtcbiAgICB9XG5cbiAgICBzZXRNYWluVmlkZW8oKSB7XG4gICAgICAgIHRoaXMuJHBsYXllci5hdHRyKCdzcmMnLCBgLy93d3cueW91dHViZS5jb20vZW1iZWQvJHt0aGlzLmN1cnJlbnRWaWRlby5pZH1gKTtcbiAgICB9XG5cbiAgICBzZXRBY3RpdmVUaHVtYigpIHtcbiAgICAgICAgdGhpcy4kdmlkZW9zLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgdGhpcy5jdXJyZW50VmlkZW8uJHNlbGVjdGVkVGh1bWIuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgIH1cblxuICAgIGJpbmRFdmVudHMoKSB7XG4gICAgICAgIHRoaXMuJHZpZGVvcy5vbignY2xpY2snLCB0aGlzLnNlbGVjdE5ld1ZpZGVvLmJpbmQodGhpcykpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdmlkZW9HYWxsZXJ5KCkge1xuICAgIGNvbnN0IHBsdWdpbktleSA9ICd2aWRlby1nYWxsZXJ5JztcbiAgICBjb25zdCAkdmlkZW9HYWxsZXJ5ID0gJChgW2RhdGEtJHtwbHVnaW5LZXl9XWApO1xuXG4gICAgJHZpZGVvR2FsbGVyeS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICBjb25zdCAkZWwgPSAkKGVsZW1lbnQpO1xuICAgICAgICBjb25zdCBpc0luaXRpYWxpemVkID0gJGVsLmRhdGEocGx1Z2luS2V5KSBpbnN0YW5jZW9mIFZpZGVvR2FsbGVyeTtcblxuICAgICAgICBpZiAoaXNJbml0aWFsaXplZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgJGVsLmRhdGEocGx1Z2luS2V5LCBuZXcgVmlkZW9HYWxsZXJ5KCRlbCkpO1xuICAgIH0pO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==