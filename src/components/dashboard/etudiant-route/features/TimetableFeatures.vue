<script>
export default {
    name:"TimetableFeatures",
    data() {
        return{

        }
    },
}
</script>
<template>
    <div class="tab-content" id="top-tabContent">
        <div>
          <div class="container-fluid">
            <div>
              <div class="form theme-form projectcreate">
                <div style="flex: 1 1 100px">
                  <Calendar
                    :minDate="new Date()"
                    v-model="datesOfCalendar"
                    selectionMode="multiple"
                    @update:modelValue="handleValueDate"
                    inline
                    :manualInput="false"
                  />
                </div>
                <div style="flex: 1 1 200px">
                  <h5 class="text-start">{{texte1}}</h5>
                  <div class="col-lg-12">
                    <div class="mb-3 conteneur-horaire">
                      <label class="d-block">{{texte2}}</label>
                      <div class="conteneur-plage">
                        <Calendar
                          id="datepicker-timeonly_1"
                          :disabled="datesOfCalendar.length > 0 ? false : true"
                          v-model="First_heure_start_from"
                          showIcon
                          iconDisplay="input"
                          timeOnly
                          inputId="templatedisplay"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="mb-3 conteneur-horaire">
                      <label class="d-block">{{texte3}}</label>
                      <div class="conteneur-plage">
                        <Calendar
                          id="datepicker-timeonly_2"
                          :minDate="First_heure_start_from"
                          :disabled="datesOfCalendar.length > 0 ? false : true"
                          v-model="First_heure_end_to"
                          showIcon
                          iconDisplay="input"
                          timeOnly
                          inputId="templatedisplay"
                        />
                      </div>
                    </div>
                  </div>
                  <h5 class="text-start">{{texte4}}</h5>
                  <div class="col-lg-12">
                    <div class="mb-3 conteneur-horaire">
                      <label class="d-block">{{texte5}}</label>
                      <div class="conteneur-plage">
                        <Calendar
                          id="datepicker-timeonly_3"
                          :minDate="First_heure_start_from"
                          v-model="Second_heure_start_from"
                          :disabled="datesOfCalendar.length > 0 ? false : true"
                          showIcon
                          iconDisplay="input"
                          timeOnly
                          inputId="templatedisplay"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="mb-3 conteneur-horaire">
                      <label class="d-block">{{texte6}}</label>
                      <div class="conteneur-plage">
                        <Calendar
                          id="datepicker-timeonly_4"
                          :minDate="Second_heure_start_from"
                          v-model="Second_heure_end_to"
                          :disabled="datesOfCalendar.length > 0 ? false : true"
                          showIcon
                          iconDisplay="input"
                          timeOnly
                          inputId="templatedisplay"
                        />
                      </div>
                    </div>
                  </div>
                  <h6 v-if="!datesOfCalendar.length" class="text-danger d-block text-start">
                    {{texte7}}
                  </h6>
                  <div class="col-lg-12">
                    <button
                      class="btn bg-warning p-3"
                      type="submit"
                      @click="create_timetable"
                    >
                      {{texte8}}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>