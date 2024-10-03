<script>
// import Condition from "../../views/condition.vue"
export default {
    name: "Politics",
    // components:{
    //     Condition
    // },
    props: {
        status: String,
        registreUser: {
      type: Function,
      required: true,
    },
  },
    data() {
    return {
        visible:true
    };
  },
  methods:{
    clickAccept(){
        this.registreUser();
    }
  }
}
</script>

<template>
    <div class="conteneur">
        <Dialog v-model:visible="visible" 
        modal 
        header="Conditions générales d’utilisation"
         :style="{ width: '60rem' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
          <div>
            <section class="px-4 row">
              <h1 class="text-left">
                <code>Réglement 1 : Donneés à caractère personnel</code>
              </h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Accumsan sit amet
                nulla facilisi. Dolor sit amet consectetur adipiscing elit ut aliquam.
                Vulputate eu scelerisque felis imperdiet proin. Leo integer malesuada nunc
                vel. Justo nec ultrices dui sapien eget mi proin sed. Molestie ac feugiat
                sed lectus vestibulum mattis ullamcorper velit sed. Semper auctor neque
                vitae tempus quam pellentesque nec nam. Consequat interdum varius sit amet
                mattis vulputate. Turpis cursus in hac habitasse. Arcu vitae elementum
                curabitur vitae nunc sed velit dignissim sodales. Vehicula ipsum a arcu
                cursus vitae. Tellus pellentesque eu tincidunt tortor aliquam. Tempus urna
                et pharetra pharetra. In aliquam sem fringilla ut morbi tincidunt augue
                interdum. Ultricies integer quis auctor elit sed vulputate mi. Arcu cursus
                vitae congue mauris rhoncus aenean vel. Ultrices in iaculis nunc sed augue
                lacus viverra vitae. Cursus vitae congue mauris rhoncus aenean vel. In
                nisl nisi scelerisque eu ultrices. Neque vitae tempus quam pellentesque.
                Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis.
                Pellentesque habitant morbi tristique senectus et. Imperdiet sed euismod
                nisi porta lorem mollis aliquam. Quis hendrerit dolor magna eget est lorem
                ipsum dolor. Id aliquet risus feugiat in ante metus dictum. Varius sit
                amet mattis vulputate enim nulla aliquet porttitor. Sit amet consectetur
                adipiscing elit duis. Neque gravida in fermentum et sollicitudin. Congue
                eu consequat ac felis donec et odio pellentesque diam. Turpis egestas
                integer eget aliquet nibh praesent tristique magna sit. Nec ullamcorper
                sit amet risus. Est ultricies integer quis auctor elit sed vulputate.
                Aliquam faucibus purus in massa tempor nec feugiat. At lectus urna duis
                convallis convallis. Elementum nibh tellus molestie nunc non blandit
                massa. Vivamus at augue eget arcu dictum varius. Phasellus egestas tellus
                rutrum tellus pellentesque eu tincidunt tortor. Varius vel pharetra vel
                turpis nunc eget. Dignissim cras tincidunt lobortis feugiat vivamus. Etiam
                non quam lacus suspendisse faucibus interdum posuere. Malesuada nunc vel
                risus commodo viverra maecenas accumsan lacus vel. Ullamcorper sit amet
                risus nullam eget. Placerat vestibulum lectus mauris ultrices eros in
                cursus. Nulla pellentesque dignissim enim sit amet venenatis urna cursus
                eget. Volutpat odio facilisis mauris sit amet massa vitae tortor
                condimentum. Donec et odio pellentesque diam volutpat. Massa massa
                ultricies mi quis hendrerit dolor. Ac tortor dignissim convallis aenean
                et. Dis parturient montes nascetur ridiculus. Eu volutpat odio facilisis
                mauris sit. Porttitor massa id neque aliquam. Dui ut ornare lectus sit
                amet. Sem fringilla ut morbi tincidunt augue interdum velit euismod. Id
                nibh tortor id aliquet lectus proin nibh. Nulla pellentesque dignissim
                enim sit. Faucibus nisl tincidunt eget nullam. Purus ut faucibus pulvinar
                elementum integer enim neque volutpat ac. Gravida in fermentum et
                sollicitudin ac orci phasellus egestas tellus. Fames ac turpis egestas
                integer eget aliquet nibh praesent. Odio facilisis mauris sit amet. Odio
                ut enim blandit volutpat maecenas volutpat blandit aliquam etiam. In
                aliquam sem fringilla ut. Cras pulvinar mattis nunc sed blandit libero.
                Integer quis auctor elit sed vulputate mi. A diam maecenas sed enim ut
                sem. Penatibus et magnis dis parturient montes nascetur ridiculus mus
                mauris. Sagittis nisl rhoncus mattis rhoncus urna neque viverra. Metus
                vulputate eu scelerisque felis. Elit pellentesque habitant morbi
                tristique. Aliquam purus sit amet luctus venenatis. Sollicitudin tempor id
                eu nisl nunc mi. Sit amet cursus sit amet. Eget egestas purus viverra
                accumsan in. Purus gravida quis blandit turpis cursus in hac habitasse
                platea. Nibh tellus molestie nunc non blandit massa enim nec. A lacus
                vestibulum sed arcu non odio euismod lacinia. Erat velit scelerisque in
                dictum. Nibh venenatis cras sed felis eget velit. Aliquam id diam maecenas
                ultricies mi. Gravida neque convallis a cras semper auctor. Tellus cras
                adipiscing enim eu turpis egestas pretium. Morbi tempus iaculis urna id
                volutpat. Amet volutpat consequat mauris nunc congue nisi vitae suscipit.
                Odio morbi quis commodo odio aenean. Viverra nibh cras pulvinar mattis
                nunc sed blandit libero. Tristique sollicitudin nibh sit amet. Risus sed
                vulputate odio ut enim blandit volutpat. Mi quis hendrerit dolor magna
                eget est lorem ipsum dolor. Varius quam quisque id diam vel. Turpis
                egestas maecenas pharetra convallis. Donec ac odio tempor orci. At
                ultrices mi tempus imperdiet nulla malesuada pellentesque. Ornare arcu
                odio ut sem nulla pharetra diam. Nibh nisl condimentum id venenatis a
                condimentum vitae sapien pellentesque. Faucibus interdum posuere lorem
                ipsum dolor sit amet consectetur adipiscing. Diam maecenas ultricies mi
                eget mauris pharetra et ultrices neque. Sit amet consectetur adipiscing
                elit. Lobortis elementum nibh tellus molestie nunc. Rhoncus aenean vel
                elit scelerisque mauris. Faucibus vitae aliquet nec ullamcorper sit.
                Nullam non nisi est sit amet facilisis magna. Laoreet id donec ultrices
                tincidunt arcu non. Fusce id velit ut tortor pretium viverra suspendisse
                potenti nullam. Amet consectetur adipiscing elit pellentesque habitant
                morbi tristique. Non enim praesent elementum facilisis leo vel. Arcu odio
                ut sem nulla. At quis risus sed vulputate odio ut enim. Mattis
                pellentesque id nibh tortor id aliquet lectus. Turpis massa tincidunt dui
                ut ornare lectus. Hac habitasse platea dictumst vestibulum rhoncus est
                pellentesque elit ullamcorper. Fermentum leo vel orci porta non pulvinar
                neque laoreet suspendisse. Libero id faucibus nisl tincidunt eget nullam.
                Aliquam vestibulum morbi blandit cursus risus at. Quam lacus suspendisse
                faucibus interdum posuere lorem ipsum dolor sit. Adipiscing diam donec
                adipiscing tristique risus nec feugiat in. Id aliquet risus feugiat in
                ante metus dictum at tempor. Leo duis ut diam quam nulla. Faucibus vitae
                aliquet nec ullamcorper sit amet. Sem integer vitae justo eget magna
                fermentum. Massa sed elementum tempus egestas sed sed risus pretium. Ut
                placerat orci nulla pellentesque. Non enim praesent elementum facilisis
                leo vel. Est velit egestas dui id ornare arcu. Massa tincidunt dui ut
                ornare lectus sit amet est. Feugiat in fermentum posuere urna. Egestas
                integer eget aliquet nibh praesent tristique magna sit amet. At volutpat
                diam ut venenatis tellus in metus. Amet nulla facilisi morbi tempus
                iaculis urna id volutpat. Tellus orci ac auctor augue mauris augue neque
                gravida in. Est pellentesque elit ullamcorper dignissim. Tempus egestas
                sed sed risus pretium quam vulputate dignissim suspendisse. Auctor neque
                vitae tempus quam pellentesque nec. Gravida neque convallis a cras semper.
                Tristique senectus et netus et malesuada fames ac turpis egestas. Arcu
                odio ut sem nulla pharetra. Viverra accumsan in nisl nisi scelerisque eu
                ultrices. Rhoncus mattis rhoncus urna neque viverra justo nec ultrices.
                Nunc aliquet bibendum enim facilisis gravida neque convallis a. At lectus
                urna duis convallis convallis tellus id. Sem fringilla ut morbi tincidunt.
                Amet justo donec enim diam vulputate ut pharetra. Cursus sit amet dictum
                sit amet justo donec enim. Fringilla est ullamcorper eget nulla facilisi
                etiam dignissim diam quis. Justo eget magna fermentum iaculis eu non diam.
                Urna duis convallis convallis tellus id interdum. Velit aliquet sagittis
                id consectetur.
              </p>
              <h1 class="text-left">
                <code>Réglement 2 : Collecte et traitement des données</code>
              </h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Justo nec ultrices dui
                sapien eget mi proin sed libero. Adipiscing diam donec adipiscing
                tristique risus. Sit amet luctus venenatis lectus. Cras tincidunt lobortis
                feugiat vivamus at augue. Pellentesque eu tincidunt tortor aliquam.
                Natoque penatibus et magnis dis parturient montes nascetur. Purus semper
                eget duis at tellus at urna condimentum mattis. A lacus vestibulum sed
                arcu non odio euismod lacinia. At ultrices mi tempus imperdiet nulla
                malesuada pellentesque. Ipsum faucibus vitae aliquet nec ullamcorper sit
                amet risus nullam. Porta nibh venenatis cras sed felis eget velit aliquet
                sagittis. Eget nunc lobortis mattis aliquam faucibus purus. Euismod
                lacinia at quis risus sed vulputate odio ut. Tellus id interdum velit
                laoreet id donec ultrices tincidunt arcu. Vestibulum sed arcu non odio
                euismod lacinia at quis. Lorem ipsum dolor sit amet consectetur adipiscing
                elit pellentesque. Ultrices in iaculis nunc sed augue lacus viverra. Id
                porta nibh venenatis cras sed. Scelerisque eu ultrices vitae auctor eu
                augue. Iaculis urna id volutpat lacus. Dictumst quisque sagittis purus sit
                amet volutpat. Dui faucibus in ornare quam viverra orci. Nulla porttitor
                massa id neque aliquam vestibulum morbi. Blandit volutpat maecenas
                volutpat blandit aliquam etiam erat velit scelerisque. At quis risus sed
                vulputate odio ut enim. Nibh venenatis cras sed felis eget velit.
                Vulputate dignissim suspendisse in est ante in. Massa vitae tortor
                condimentum lacinia quis vel. Venenatis tellus in metus vulputate eu
                scelerisque. Lorem ipsum dolor sit amet consectetur adipiscing. Massa
                massa ultricies mi quis hendrerit dolor. Ornare aenean euismod elementum
                nisi quis eleifend quam. Odio euismod lacinia at quis risus. Tristique
                risus nec feugiat in fermentum posuere urna. Non tellus orci ac auctor
                augue mauris augue. Pharetra pharetra massa massa ultricies mi quis
                hendrerit dolor. Magna etiam tempor orci eu lobortis. Malesuada fames ac
                turpis egestas. Praesent tristique magna sit amet purus gravida quis
                blandit. Feugiat vivamus at augue eget. Mauris rhoncus aenean vel elit.
                Vehicula ipsum a arcu cursus vitae congue mauris. Ipsum dolor sit amet
                consectetur adipiscing elit duis tristique. Turpis massa tincidunt dui ut
                ornare lectus sit amet est. Tellus mauris a diam maecenas. Sagittis id
                consectetur purus ut faucibus. Nibh cras pulvinar mattis nunc sed blandit
                libero volutpat. Diam vulputate ut pharetra sit amet aliquam id. Eu
                lobortis elementum nibh tellus. Natoque penatibus et magnis dis parturient
                montes nascetur ridiculus mus. Venenatis tellus in metus vulputate eu
                scelerisque felis imperdiet proin. Felis eget nunc lobortis mattis aliquam
                faucibus. Elementum sagittis vitae et leo duis ut diam quam nulla. Neque
                viverra justo nec ultrices dui sapien eget. At elementum eu facilisis sed
                odio. Justo eget magna fermentum iaculis eu non diam phasellus vestibulum.
                Facilisis volutpat est velit egestas. Scelerisque varius morbi enim nunc
                faucibus a pellentesque sit amet. Cursus sit amet dictum sit amet justo
                donec enim diam. Lectus arcu bibendum at varius vel pharetra vel turpis.
                Turpis tincidunt id aliquet risus feugiat in. Non odio euismod lacinia at
                quis. Sem viverra aliquet eget sit amet tellus cras adipiscing enim.
                Lobortis mattis aliquam faucibus purus. Sit amet luctus venenatis lectus
                magna fringilla. Gravida arcu ac tortor dignissim. Massa sapien faucibus
                et molestie ac feugiat. Venenatis urna cursus eget nunc scelerisque
                viverra. Maecenas accumsan lacus vel facilisis volutpat est velit egestas.
                Tincidunt id aliquet risus feugiat in ante metus. Sagittis vitae et leo
                duis ut diam quam. Viverra tellus in hac habitasse platea dictumst.
                Egestas pretium aenean pharetra magna ac placerat vestibulum lectus
                mauris. Mauris ultrices eros in cursus. Ornare massa eget egestas purus
                viverra accumsan in nisl nisi. Aliquet sagittis id consectetur purus ut
                faucibus pulvinar. Quam id leo in vitae turpis massa. Duis at consectetur
                lorem donec massa sapien faucibus et. Metus vulputate eu scelerisque felis
                imperdiet proin fermentum leo vel. Quis auctor elit sed vulputate mi sit
                amet mauris. Id porta nibh venenatis cras sed felis. Diam ut venenatis
                tellus in metus vulputate. Fringilla est ullamcorper eget nulla.
                Scelerisque eleifend donec pretium vulputate sapien. Vel turpis nunc eget
                lorem dolor. Elit ullamcorper dignissim cras tincidunt lobortis feugiat
                vivamus. Sit amet nulla facilisi morbi tempus iaculis urna.
              </p>
              <h1 class="text-left">
                <code>Réglement 3 : Contacter un personnel</code>
              </h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae ipsa
                dignissimos minus fugiat velit quaerat non provident laudantium corporis
                aliquam. Tenetur in error excepturi pariatur voluptatem recusandae eos
                nesciunt ut.
              </p>
              <h1 class="text-left">
                <code>Réglement 4 : Postuler à une offre</code>
              </h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
                excepturi at, pariatur cum reiciendis illum a culpa nobis ex, provident
                deleniti veniam dignissimos! Voluptatum fugiat tenetur repellat ad
                similique reprehenderit!
              </p>
              <h1 class="text-left">
                  <code>Réglement 4 : Securité</code>
                </h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
                  excepturi at, pariatur cum reiciendis illum a culpa nobis ex, provident
                  deleniti veniam dignissimos! Voluptatum fugiat tenetur repellat ad
                  similique reprehenderit!
                </p>
              
            </section>
            <section class="text-right">
              <button class="btn-lg p-2 bg-warning" @click.prevent="clickAccept">Accepter</button>
            </section>
          </div>
        </Dialog>
    </div>
</template>
<style scoped>
.conteneur{
    display: flex;
    justify-content: center;
    background: black;
}


</style>