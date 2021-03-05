<template>
  <div :class="navbarContentContainerClass">
    <!-- Brand -->
    <b-navbar-brand
      :to="routeTo(routes.home)"
      :class="navbarBrandClass">
      <fmv-avatar
        :title="true"
        title-class="bg-primary"
        size="sm"
        no-link
        class="navbar-brand-icon mr-0 mr-lg-8pt">
        <b-img
          :src="brandImage"
          class="img-fluid"
          width="40"
          :alt="navbarBrand" />
      </fmv-avatar>
      <span
        class="d-none d-lg-block"
        v-text="navbarBrand" />
    </b-navbar-brand>

    <template v-if="! navbarFullSampleGuestMode && navbarStats && ! isInstructor">
      <span
        class="d-none d-md-flex align-items-center mr-16pt">
        <fmv-avatar
          :title="true"
          title-class="navbar-avatar"
          size="sm"
          class="mr-12pt">
          <md-icon>opacity</md-icon>
        </fmv-avatar>
        <small class="flex d-flex flex-column">
          <strong class="navbar-text-100">Experience IQ</strong>
          <span class="navbar-text-50">2,300 points</span>
        </small>
      </span>
    </template>

    <template v-if="! navbarFullSampleGuestMode && navbarStats && isInstructor">
      <span class="d-none d-md-flex align-items-center mr-16pt">
        <fmv-avatar
          :title="true"
          title-class="navbar-avatar"
          size="sm"
          class="mr-12pt">
          <md-icon>trending_up</md-icon>
        </fmv-avatar>
        <small class="flex d-flex flex-column">
          <strong
            class="navbar-text-100"
            v-text="$t('Earnings')" />
          <span class="navbar-text-50">&dollar;12.3k</span>
        </small>
      </span>
      <span class="d-none d-md-flex align-items-center mr-16pt">
        <fmv-avatar
          :title="true"
          title-class="navbar-avatar"
          size="sm"
          class="mr-12pt">
          <md-icon>receipt</md-icon>
        </fmv-avatar>
        <small class="flex d-flex flex-column">
          <strong
            class="navbar-text-100"
            v-text="$t('Sales')" />
          <span class="navbar-text-50">264</span>
        </small>
      </span>
    </template>

    <template v-if="navbarFullSampleGuestMode">
      <b-navbar-nav
        class="d-none d-sm-flex flex justify-content-start ml-8pt">
        <b-nav-item
          :to="routeTo(routes.home)"
          exact>
          {{ $t('Home') }}
        </b-nav-item>
        <b-nav-item-dropdown
          :text="$t('Courses')"
          no-caret>
          <b-dropdown-item :to="routeTo(routes.studentCourses)">{{ $t('Browse Courses') }}</b-dropdown-item>
          <b-dropdown-item :to="routeTo(routes.studentCourse)">{{ $t('Preview Course') }}</b-dropdown-item>
          <b-dropdown-item :to="routeTo(routes.studentLesson)">{{ $t('Preview Lesson') }}</b-dropdown-item>
          <b-dropdown-item :to="routeTo(routes.studentTakeCourse)">
            <span class="mr-16pt">{{ $t('Take Course') }}</span>
            <b-badge
              variant="accent badge-notifications"
              class="text-uppercase ml-auto"
              v-text="$t('Pro')" />
          </b-dropdown-item>
          <b-dropdown-item :to="routeTo(routes.studentTakeLesson)">{{ $t('Take Lesson') }}</b-dropdown-item>
          <b-dropdown-item :to="routeTo(routes.studentTakeQuiz)">{{ $t('Take Quiz') }}</b-dropdown-item>
          <b-dropdown-item :to="routeTo(routes.studentQuizResult)">{{ $t('Quiz Result') }}</b-dropdown-item>
          <b-dropdown-item :to="routeTo(routes.studentDashboard)">{{ $t('Student Dashboard') }}</b-dropdown-item>
          <b-dropdown-item :to="routeTo(routes.studentMyCourses)">{{ $t('My Courses') }}</b-dropdown-item>
          <b-dropdown-item :to="routeTo(routes.studentMyQuizzes)">{{ $t('My Quizzes') }}</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown
          :text="$t('Paths')"
          no-caret>
          <b-dropdown-item :to="routeTo(routes.studentPaths)">{{ $t('Browse Paths') }}</b-dropdown-item>
          <b-dropdown-item :to="routeTo(routes.studentPath)">{{ $t('Path Details') }}</b-dropdown-item>
          <b-dropdown-item :to="routeTo(routes.studentSkillAssessment)">{{ $t('Skill Assessment') }}</b-dropdown-item>
          <b-dropdown-item :to="routeTo(routes.studentSkillResult)">{{ $t('Skill Result') }}</b-dropdown-item>
          <b-dropdown-item :to="routeTo(routes.studentMyPaths)">{{ $t('My Paths') }}</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item :to="routeTo(routes.pricing)">{{ $t('Pricing') }}</b-nav-item>
        <b-nav-item-dropdown
          :text="$t('Instructor')"
          no-caret>
          <b-dropdown-item :to="routeTo(routes.instructorDashboard)">{{ $t('Instructor Dashboard') }}</b-dropdown-item>
          <b-dropdown-item :to="routeTo(routes.instructorCourses)">{{ $t('Manage Courses') }}</b-dropdown-item>
          <b-dropdown-item :to="routeTo(routes.instructorQuizzes)">{{ $t('Manage Quizzes') }}</b-dropdown-item>
          <b-dropdown-item :to="routeTo(routes.instructorEarnings)">{{ $t('Earnings') }}</b-dropdown-item>
          <b-dropdown-item :to="routeTo(routes.instructorStatement)">{{ $t('Statement') }}</b-dropdown-item>
          <b-dropdown-item :to="routeTo(routes.instructorEditCourse)">{{ $t('Edit Course') }}</b-dropdown-item>
          <b-dropdown-item :to="routeTo(routes.instructorEditQuiz)">{{ $t('Edit Quiz') }}</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown
          v-b-tooltip.hover.bottom="{ title: $t('Community') }"
          no-caret
          right>
          <template slot="button-content">
            <md-icon>people_outline</md-icon>
          </template>
          <b-dropdown-item :to="routeTo(routes.teachers)">{{ $t('Browse Teachers') }}</b-dropdown-item>
          <b-dropdown-item :to="routeTo(routes.studentProfile)">{{ $t('Student Profile') }}</b-dropdown-item>
          <b-dropdown-item :to="routeTo(routes.instructorProfile)">{{ $t('Instructor Profile') }}</b-dropdown-item>
          <b-dropdown-item :to="routeTo(routes.blog)">{{ $t('Blog') }}</b-dropdown-item>
          <b-dropdown-item :to="routeTo(routes.blogPost)">{{ $t('Blog Post') }}</b-dropdown-item>
          <b-dropdown-item :to="routeTo(routes.faq)">{{ $t('FAQ') }}</b-dropdown-item>
          <b-dropdown-item :to="routeTo(routes.helpCenter)">{{ $t('Help Center') }}</b-dropdown-item>
          <b-dropdown-item :to="routeTo(routes.discussions)">{{ $t('Discussions') }}</b-dropdown-item>
          <b-dropdown-item :to="routeTo(routes.discussion)">{{ $t('Discussion Details') }}</b-dropdown-item>
          <b-dropdown-item :to="routeTo(routes.askQuestion)">{{ $t('Ask Question') }}</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </template>

    <template v-if="navbarSearch">
      <!-- Search -->
      <b-form
        class="search-form navbar-search d-none mr-16pt"
        :class="{
          'd-lg-flex': navbarFullSampleGuestMode,
          'd-md-flex': !navbarFullSampleGuestMode
        }">
        <b-button variant="none">
          <md-icon>search</md-icon>
        </b-button>
        <b-form-input
          :placeholder="$t('Search')"
          type="text" />
      </b-form>
      <!-- // END Search -->
    </template>

    <!-- Menu -->
    <b-navbar-nav class="flex-nowrap d-flex ml-auto">

      <template
        v-if="navbarFullSampleGuestMode">
        <b-nav-item
          v-b-tooltip.hover.bottom="{ title: $t('Login') }"
          :to="routeTo(routes.login)">
          <md-icon>lock_open</md-icon>
        </b-nav-item>
        <li
          class="nav-item">
          <b-btn
            :to="routeTo(routes.signup)"
            :variant="ctaClass"
            v-text="$t('Sign Up')" />
        </li>
      </template>

      <template
        v-else>

        <!-- Messages -->
        <navbar-notifications
          icon="mail_outline"
          icon-class="icon-24pt"
          title="Messages"
          :notifications="messages"
          :route-messages="routes.messages" />

        <!-- Notifications -->
        <navbar-notifications
          :badge="true"
          :notifications="notifications"
          :route-messages="routes.messages" />

        <!-- Localization -->
        <i18n-dropdown navbar />

        <!-- User Dropdown -->
        <b-nav-item-dropdown
          v-b-tooltip.hover.bottom="{ title: $t('Account') }"
          right>
          <template slot="button-content">
            <fmv-avatar
              :title="true"
              title-class="bg-primary"
              size="sm"
              circle
              no-link>
              <md-icon>account_box</md-icon>
            </fmv-avatar>
          </template>
          <b-dropdown-header
            tag="div"
            class="form-label">
            {{ $t('Manage') }}
          </b-dropdown-header>
          <b-dropdown-item :to="routeTo(routes.editAccount)">
            {{ $t('Edit Account') }}
          </b-dropdown-item>
          <b-dropdown-item :to="routeTo(routes.editAccountProfile)">
            {{ $t('Profile & Privacy') }}
          </b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item :to="routeTo(routes.studentProfile)">
            <md-icon>person</md-icon> {{ $t('Public Profile') }}
          </b-dropdown-item>
          <b-dropdown-item :to="routeTo(routes.logout || routes.login)">
            <md-icon>lock</md-icon> {{ $t('Logout') }}
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <!-- // END User dropdown -->

      </template>

    </b-navbar-nav>
    <!-- // END Menu -->
  </div>
</template>

<script>
import { NavbarFullContentSample } from 'vue-luma'

export default {
  name: 'NavbarContent',
  extends: NavbarFullContentSample
}
</script>
