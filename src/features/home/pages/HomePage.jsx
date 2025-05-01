import { useAuth } from "@/features/auth/hooks/useAuth";
import { useAuthStore } from "@/features/auth/store/auth.store";
import AuthDebug from "@/shared/components/AuthDebug";
import Button from "@/shared/components/Button";

export default function HomePage() {
  const { user } = useAuthStore();
  console.log(user)
  const { logout } = useAuth();
  const handleLogout = () => {
    logout(); 
  };
  return (
    <>
      <h1>Home Page</h1>
      <img src={user.avatar} alt="" />
      <Button onClick={handleLogout}>deconnexion</Button>
      <AuthDebug/>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe nobis eaque velit magnam officiis, voluptas consectetur. Fugit velit voluptatibus doloremque aperiam voluptate corrupti. Repudiandae voluptatibus eligendi quisquam blanditiis neque rem?
      Totam deserunt provident fugit maxime suscipit excepturi itaque unde tempore? Enim velit, quas at eos possimus ut distinctio ipsum odio sit minus facere delectus excepturi illum? Nam impedit doloremque explicabo!
      Amet, dolorum odio iure laborum nulla esse quidem ex at? Aut iste magni, sit eius adipisci voluptatem beatae magnam, tempore obcaecati ullam asperiores ut minima quam eveniet dolores maxime exercitationem.
      Blanditiis debitis optio id odit iste sequi eos, ipsum nobis dolorum vitae asperiores dolores? Beatae saepe vitae repudiandae porro officiis, minus sunt nisi quae omnis consequuntur accusantium voluptatem unde cumque?
      Nobis corporis quo quos mollitia officiis praesentium sequi minima qui dolorum alias dolorem, natus tempore ex delectus reiciendis eos facere accusamus consectetur porro. Nam harum, enim error odit dolores aliquid.
      Porro, sequi maiores hic aspernatur, aperiam cumque et ex similique deleniti nam id, provident saepe inventore nostrum officiis! Autem repellendus animi cum ratione corporis illo eveniet. Obcaecati similique totam ad.
      Eos fuga voluptate facere atque velit labore necessitatibus in laborum ab corrupti temporibus libero consequuntur dolor nobis natus commodi nemo optio quos, expedita nulla! Eos consequatur quod eligendi! Ad, possimus.
      Iure quis sint ducimus earum consequatur delectus doloremque dolorum explicabo, reprehenderit obcaecati magni nostrum esse suscipit consequuntur beatae. Soluta quae possimus ullam nesciunt a cupiditate! Quis atque sequi optio deserunt.
      Praesentium sequi nam ducimus? Beatae temporibus perspiciatis nemo neque at perferendis officia illo voluptate omnis doloribus, amet quae enim numquam ipsam. Mollitia fuga laboriosam et dolor beatae? Molestias, quia incidunt?
      Ab veniam doloribus odit placeat consequatur soluta quam, culpa delectus aspernatur sapiente perferendis sequi voluptas commodi accusamus, mollitia tempore distinctio, necessitatibus possimus. Blanditiis sint illo odio saepe eius pariatur ipsum!
      Dolorum sit eius earum at laborum perspiciatis, eum iusto fuga accusantium! Sed alias sunt explicabo! Asperiores atque delectus nihil eos quidem modi perferendis velit porro? Aliquam rem doloribus dolores nostrum.
      Impedit dolor optio facilis, tempore perferendis, amet obcaecati corporis expedita esse sed architecto vero enim pariatur id? Culpa ipsam eveniet explicabo sint, dolorum vitae placeat distinctio minima, architecto aliquid suscipit?
      Commodi, maiores reprehenderit ratione veritatis a quis ea illo iste nisi officiis? Tempora hic quod nobis sint culpa temporibus omnis ipsam, non error accusantium odio eum voluptatum vero amet enim.
      Eveniet aut modi eaque nisi nesciunt totam, incidunt illo exercitationem veniam earum et id laudantium reprehenderit, animi dolores saepe esse odio itaque architecto magnam vero. Enim et accusamus ex quia?
      Qui vel natus rem numquam cum cupiditate. Aliquam, similique ipsam. Dolorem possimus, aliquid minus deleniti omnis architecto. Eveniet itaque tempora deleniti obcaecati, ea exercitationem ratione cupiditate perspiciatis a officiis fugiat?
      Odit adipisci unde officiis obcaecati nesciunt rerum quo illum magni architecto aperiam. Error officia nostrum dolore reiciendis dolores obcaecati, quae iusto ullam, delectus autem vel facilis placeat maiores. Nulla, voluptates.
      Accusantium ipsa quis, doloremque, praesentium voluptate totam sapiente aspernatur omnis voluptatum, quisquam esse quam. Nam incidunt magni consequatur. Dicta deleniti saepe nam eligendi unde! Est illum dolorem vel inventore ipsa!
      Dicta numquam illum non quibusdam, deserunt vitae consequuntur voluptate omnis, cumque nam optio ipsum officia deleniti temporibus minima aliquam dolorem? Deserunt, voluptatum at ad ea quisquam quia! Rerum, fugiat autem.
      Voluptate qui animi corrupti commodi, itaque odit, dolorem harum deleniti debitis dolorum accusantium, libero nesciunt rem ea adipisci eius suscipit ullam unde? Placeat nobis repudiandae praesentium distinctio quis vero ratione.
      Expedita, ratione sapiente. Cum consequatur illum in voluptate, magni quis asperiores debitis alias perferendis dolorem iure dolores incidunt aut, ex culpa ab provident totam porro quas possimus. Dolore, sed magnam?
      Incidunt dolorum, consequatur, rerum soluta vel ea earum quasi illo asperiores placeat enim provident repellat nam facilis totam sequi voluptatum ipsam consequuntur animi quam in mollitia magnam veniam maxime. Ducimus.
      Eum, quae quaerat culpa tempore exercitationem adipisci voluptatem non hic. Incidunt molestias, quae corrupti necessitatibus ducimus neque rerum, distinctio ipsum velit repellat nam fugiat modi impedit! Quo pariatur ex sequi.
      Mollitia veritatis vel labore nemo ratione. Aliquam est sed consectetur autem praesentium minus obcaecati facere tempora explicabo quam commodi magni quibusdam id, itaque delectus nam, amet optio, dignissimos neque! Minus.
      Optio sint enim alias ad minus sit deleniti quisquam iure molestias doloremque modi nihil, voluptatibus voluptate impedit nobis esse necessitatibus ratione maiores tenetur ducimus vel magni! Veniam commodi placeat rerum.
      Repudiandae, doloribus deserunt ut nostrum maxime eligendi quam, illo corporis fuga totam excepturi qui officia maiores unde officiis odio! Explicabo cumque debitis est accusamus voluptatem fugit nulla animi itaque? Tenetur!
      Ex atque, non quo, necessitatibus, suscipit nostrum sit a fugiat error iusto aperiam voluptatem repellat at perferendis. Corporis eaque cumque placeat dolores, est, adipisci dolor expedita voluptate, sunt nesciunt quis.
      Sit, pariatur ipsa. Quod molestias rerum provident pariatur dignissimos doloribus possimus nisi natus. Soluta accusantium tenetur, facere dolores totam omnis rerum corporis suscipit sit, dolorum enim, ut nemo? Nisi, facere.
      Velit eligendi obcaecati maiores, tempora natus consequuntur odit? Nemo autem est saepe molestiae ab eveniet, neque, voluptatem rem mollitia ipsa, dicta delectus alias veniam maiores beatae minima! Dicta, quod similique.
      Nisi earum quae, debitis deserunt perspiciatis vero ratione at neque ad velit iste! Fuga suscipit itaque velit. Sapiente aspernatur culpa deserunt quod perspiciatis eligendi vitae in, autem magnam ipsam repellendus.
      Dolor quod suscipit saepe maxime placeat, quaerat mollitia, illo repellendus dolorum natus inventore similique excepturi expedita beatae praesentium id ea et rem provident voluptatum in quidem porro voluptate a? Debitis.
      Quibusdam harum similique nam modi inventore amet. Voluptatibus dolorem possimus esse, doloremque impedit quam harum libero commodi id numquam illum iure consectetur reiciendis rerum, sequi architecto repellat aspernatur maxime accusamus?
      Debitis hic adipisci velit doloribus, libero eaque nulla! Sunt numquam ipsam laudantium reiciendis necessitatibus facilis accusantium aut autem? Nihil, repudiandae? Nisi qui, quas voluptatum quis dolor iusto iure laudantium minus!
      Enim, dicta delectus hic vero voluptatibus veniam! Quam non natus, hic laborum esse repellat, deleniti magni, nulla blanditiis quaerat similique soluta quo nemo! Perspiciatis nemo voluptate quasi consequatur? Facilis, excepturi!
      Magni laborum perferendis ullam dolorum recusandae ipsum dolor saepe ipsa, ipsam cum, explicabo odit nisi laudantium, repudiandae est. Iste sint molestiae facilis sequi porro culpa labore earum, accusantium dolores nesciunt.
      Repellat at velit ipsum, fugit odio quam ipsa! Doloribus aliquam voluptatibus excepturi reprehenderit aperiam non voluptas omnis! Numquam, maxime officia, vero explicabo, sed cum doloribus praesentium nam perspiciatis neque ipsa.
      Iure illo, veniam veritatis tempore aliquam dignissimos nisi debitis optio saepe quam beatae minus modi! Aut non beatae vero quibusdam pariatur. Itaque commodi reprehenderit harum tenetur modi. Eveniet, nesciunt mollitia.
      Numquam suscipit est ipsam excepturi in. Similique, consequatur fuga repellat earum exercitationem fugit nemo facere vero enim vel reiciendis modi quibusdam beatae itaque eius architecto, repellendus, error quasi odit deserunt?
      Exercitationem sapiente placeat consequatur vel modi, voluptas asperiores. Magnam maxime, molestiae perferendis quos repellendus eum deserunt inventore quidem a autem delectus, reprehenderit reiciendis ad explicabo distinctio in sed iusto nulla.
      Id nesciunt, vitae exercitationem possimus error iusto provident sed esse eaque blanditiis laudantium, animi, optio incidunt sint sapiente magni atque placeat amet labore harum et itaque debitis. Cum, laudantium ullam!
      Doloribus possimus laborum porro quisquam provident eaque amet dolorum odio voluptatibus corporis, veniam velit nam iure est vero blanditiis, unde quo recusandae ipsum libero aspernatur nemo delectus. Harum, cum voluptatem.
      Saepe culpa ut autem velit nihil. Deserunt atque quam blanditiis quod, incidunt ducimus? Debitis unde animi similique possimus deserunt mollitia, impedit, accusamus enim saepe, dolore rem inventore obcaecati molestias sed.
      Culpa sed, voluptates hic nesciunt laborum rem exercitationem! Esse dicta maxime quis et, rem quisquam laudantium cum nulla voluptatum est rerum totam soluta eum autem vitae saepe quibusdam! Perferendis, ut?
      Voluptates quasi nulla nihil voluptas dolorem architecto, fuga incidunt animi suscipit laudantium quod nostrum excepturi aliquam exercitationem sunt similique. Doloribus, ea similique! Ut laborum et corrupti odio suscipit, qui cupiditate.
      Explicabo adipisci provident officiis? Cupiditate dolorem, velit vitae sequi, soluta, similique aliquid quas iure exercitationem iste perferendis assumenda blanditiis. Totam voluptas suscipit at voluptatem pariatur possimus amet aspernatur, sint eaque!
      Laudantium facere consequatur voluptatem, exercitationem eaque, iste itaque fugiat magnam aspernatur quas impedit error quisquam quos quis minus. Id odio nisi aut reprehenderit distinctio natus veniam itaque vero neque fugiat.
      Corrupti facilis, sapiente quisquam, quidem blanditiis ratione quam minima placeat eos nihil distinctio? Amet dignissimos rerum laudantium nihil quia repudiandae, adipisci nesciunt minus eius excepturi corporis enim. Architecto, maxime fuga?
      Autem ex aperiam a dolores dolorem ullam tempora animi natus, quidem repellendus rem consequuntur ab cupiditate quae voluptate deserunt optio fuga. Facere alias excepturi dolorem nostrum optio dicta natus atque.
      Molestiae, ut rerum. Obcaecati molestias animi vel ea numquam corporis dolore nemo praesentium, fugiat, ut impedit et, possimus modi. Provident dolor asperiores laudantium saepe quasi sed eius aliquid assumenda explicabo.
      Voluptatum voluptatibus sequi esse consectetur mollitia, quasi commodi excepturi omnis itaque? Pariatur dolorem omnis labore nemo nobis quod ad animi vel deserunt impedit dolores recusandae, tempore culpa quae at enim.
      Excepturi laboriosam cum autem ratione neque deserunt sequi eveniet quae, nesciunt, commodi eligendi accusantium obcaecati asperiores recusandae architecto libero reiciendis ab corporis labore maiores delectus natus voluptate enim! Placeat, sunt.
      Tempore at rem quisquam officia voluptate voluptatibus, vel ipsum consequuntur exercitationem, iusto eaque commodi, quo quibusdam placeat similique fugiat ullam unde in voluptatem delectus maxime nemo suscipit sint recusandae. Aperiam.
      Officiis quisquam fugiat porro, ullam necessitatibus animi aut non quas commodi ducimus architecto veritatis quam quo at minus eaque quod ab eum maxime corrupti a eveniet accusamus explicabo placeat? Pariatur.
      Error, tempore explicabo molestiae exercitationem amet delectus aliquid vel rerum harum, commodi dignissimos eos laboriosam atque tenetur quibusdam. Aperiam ipsum minus quod praesentium voluptas possimus, blanditiis fugiat assumenda numquam odio!
      Dicta sunt aperiam ea, rem molestiae impedit ipsam doloremque. Assumenda voluptatibus porro quas tempore omnis modi consectetur, commodi quae maxime nesciunt molestiae natus. Distinctio asperiores, quos voluptates dolores nihil impedit.
      Modi rem rerum cumque provident voluptates sequi voluptatibus iste! Tempore ipsa molestias error laudantium vero? Quia vero dolor itaque! Repellendus odit repudiandae nesciunt eum ducimus sapiente accusantium voluptatem molestiae officia.
      Cum praesentium maxime ex quos id harum, repudiandae nostrum modi eos illo itaque alias debitis at nisi recusandae atque iure perferendis assumenda voluptas, excepturi sed. Beatae dignissimos excepturi assumenda nemo!
      Labore dicta, amet eveniet sint tempore rem ipsam eius. Blanditiis id, ullam dolorum earum dolore aliquid tempore et soluta fugiat dolorem, rem facilis quas labore at fugit sequi. Dolor, sapiente!
      Dolorem beatae facere reprehenderit, quod quasi quia id, corrupti, nam accusantium nisi quos adipisci illum facilis. Magnam deleniti voluptatum quidem illum voluptatem, eveniet laudantium architecto! Voluptatum a dolores inventore quos.
      Numquam libero ab similique neque inventore quibusdam nemo accusamus repellat nisi soluta, omnis modi, voluptas nesciunt voluptatibus eius, ut doloribus. Quis, quia corporis eum ut dicta vitae tempora dolorum numquam.
      Delectus beatae eaque neque atque obcaecati, earum quibusdam officiis? Magnam maxime distinctio, autem deserunt quos harum quae qui laborum accusantium suscipit fugiat, ullam impedit neque cumque laudantium ipsam id velit?
      Quo nemo, doloribus ea eum optio natus, repellendus corrupti repellat ratione, assumenda doloremque. Repellat reprehenderit cupiditate vitae nulla. Veritatis, harum. Possimus ab cum facilis recusandae qui, dicta suscipit optio voluptate?
      Repellat minima rerum dicta saepe tempore, perspiciatis eveniet reiciendis accusamus sint, laudantium sapiente sunt. Nostrum sed quibusdam sunt recusandae repellat cum, officiis esse consectetur adipisci fuga eum ullam tenetur? Officiis?
      Magnam mollitia earum ad voluptatum ullam error distinctio autem sed cumque iusto voluptas, ipsum laboriosam commodi quibusdam dolores doloribus accusantium architecto quos iure magni possimus eius dicta culpa? Fuga, eaque!
      Laboriosam maiores atque dolorum distinctio alias molestiae quo iusto fugiat? Vero, error commodi! Illum ipsa nostrum, iusto et velit neque maiores aspernatur, voluptatibus magni eaque assumenda iste facilis ratione officia!
      Itaque accusamus vitae aspernatur, ad nesciunt ipsam rem quidem praesentium accusantium tenetur repellat laboriosam unde reiciendis fugit exercitationem autem laborum qui ratione quod. Maiores, quia. Eaque repellat obcaecati animi ea!
      Eius cumque deleniti laborum praesentium error animi, odit laboriosam eum magni doloribus eos cum quia, repellat esse, ut illo tempora ullam est suscipit sit quos! In illo vero iure modi.
      Odit, qui cumque quisquam, veniam sint quidem officiis eveniet aperiam illo mollitia eos dolore veritatis nemo in voluptatibus maiores, dolorem ab esse. Accusamus, doloremque qui ipsum accusantium sint enim recusandae.</p>
    </>
  );
}
