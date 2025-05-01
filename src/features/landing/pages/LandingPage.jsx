import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/auth.store";

// LandingPage.jsx
export default function LandingPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);
  console.log(user);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Bienvenue sur BADAM 🎉</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias dicta
        rerum sed soluta aliquid sunt perspiciatis? Dolorem architecto ut quasi
        magnam, modi quaerat, quisquam illo cumque, minima et culpa voluptates!
        Laborum cumque sequi magnam odit porro voluptatum, numquam commodi
        dolorem impedit iste iusto doloremque, beatae explicabo quia molestias!
        Reiciendis iure ex mollitia, nisi dolor eum voluptatum numquam qui
        ducimus incidunt. Aspernatur, autem maxime! Iure tenetur eligendi nam
        at, saepe exercitationem totam deleniti distinctio, tempora harum fugit,
        dolorum nesciunt accusantium repellat veniam! Est aut nisi quis! Nobis
        tempore doloribus soluta veritatis? Soluta hic reiciendis aliquid,
        exercitationem voluptates consectetur vitae possimus dolore quisquam
        aspernatur atque modi quidem, a velit iusto. Nam officia officiis iste
        modi rerum sapiente dicta dolor voluptatem porro. Assumenda! Ducimus
        veritatis deleniti possimus perferendis rem! Ea, aliquam error, quae
        vitae quod tempora eum amet, officia consequatur temporibus minima. Iste
        incidunt dolore similique perspiciatis non ratione ut officia est
        officiis. Fuga nulla et suscipit quia! Laboriosam ratione illo dolores
        similique. Saepe possimus omnis nulla nihil magnam distinctio reiciendis
        recusandae autem eaque doloremque! Assumenda vel distinctio nam illo
        dolore dicta doloribus? Ipsa incidunt culpa dolore assumenda natus
        facere voluptatum, ad veritatis harum repellat placeat, eligendi
        architecto animi. Excepturi, quidem facilis reiciendis consequuntur
        mollitia animi dignissimos dolore, repellat facere fuga magni quod.
        Corporis fugiat, distinctio odit quod debitis assumenda suscipit
        quibusdam eum a vel corrupti labore impedit eveniet rerum expedita non
        incidunt sint odio. Culpa corporis quod aliquid eveniet placeat corrupti
        repellendus!
      </p>
      <br />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, vero
        saepe. Earum, harum labore? Odit non tenetur ex officiis aliquam,
        accusamus pariatur quod aperiam eveniet rem eum neque aut dolore. Ipsa
        nostrum libero quidem at facilis impedit quisquam odio id. Aperiam,
        laborum numquam obcaecati veniam ducimus expedita quisquam velit, neque
        similique voluptas rerum ut fugiat doloribus voluptatibus, sit quasi.
        Voluptatum! Vitae, possimus ipsam! Facilis quo aspernatur corrupti unde
        iste odio, obcaecati nostrum, neque veniam, numquam illo fugit. Culpa
        atque voluptatem assumenda omnis, cupiditate, saepe tempora, maiores
        minus facere exercitationem necessitatibus. Nemo, delectus. Nemo est
        ducimus commodi delectus blanditiis assumenda harum vero odit explicabo
        perspiciatis. Qui ab in labore pariatur perspiciatis omnis ex ducimus
        tempore! Praesentium asperiores reprehenderit nam earum voluptatibus.
        Doloremque dolore, corrupti minima perferendis eaque, unde odit vel vero
        fugiat voluptatibus suscipit esse possimus est. Sed quaerat, amet
        laborum nesciunt voluptatum excepturi, commodi totam saepe consectetur
        dolorem exercitationem debitis. Laborum culpa enim cumque, alias dolor
        quia numquam provident deleniti voluptates nisi deserunt vitae animi
        quas officia fugit consequuntur esse voluptatum recusandae? Explicabo
        quam dolor nostrum, tempora culpa magnam dolores? Laborum quod quibusdam
        consectetur nemo modi delectus quo placeat consequuntur deserunt
        perspiciatis! Quis, expedita voluptatum. Animi dolorem consequatur,
        recusandae ut unde sed debitis delectus, assumenda at magnam temporibus
        optio ipsa? Accusantium id dolorum beatae eius magnam fugiat doloribus
        quis quas ipsa quaerat, animi omnis repellat soluta eligendi nam
        voluptas ratione eaque? Rerum sed optio suscipit error quae praesentium
        vero commodi. Eum repudiandae voluptate ut accusantium iusto dolor
        dolore provident nesciunt suscipit optio ipsam hic perferendis sint illo
        error minima voluptatem pariatur, dicta exercitationem, veniam quasi.
        Odit facilis autem corrupti sapiente? Exercitationem impedit odit esse
        et dignissimos quos tenetur sapiente itaque magni laborum illo,
        laudantium quis fuga necessitatibus saepe eius. Quibusdam vitae laborum
        ea ab nostrum accusamus fuga impedit esse maxime. Eaque et quis odio
        officia, sunt ut itaque, nulla perferendis laboriosam, adipisci autem
        temporibus architecto ipsam iste facilis corrupti quisquam. Qui
        temporibus asperiores consequatur quae? Tenetur nulla a ipsa ut.
        Asperiores ipsam repudiandae, repellendus iusto corrupti temporibus
        voluptas excepturi. Repudiandae corporis doloribus cumque eos doloremque
        fugiat placeat temporibus vel molestias, ad rerum. Nostrum, qui
        excepturi inventore similique molestiae perferendis quidem? Culpa nemo
        cum minima. Illo quis ex culpa, aliquid, minus numquam eum totam, odio
        nobis sit doloribus pariatur dolore nemo! Perspiciatis quos repudiandae
        ex, aliquid repellendus cupiditate maiores ipsam aliquam? Sint excepturi
        neque ut accusantium amet, esse ea. Voluptatibus officiis quia
        repellendus odio aperiam, ullam repudiandae obcaecati voluptas eius
        atque voluptate pariatur laudantium provident excepturi adipisci
        perspiciatis deleniti dolor vel. Ex optio iure ipsa aspernatur omnis
        enim delectus sit sapiente. Voluptate vitae laboriosam possimus
        aspernatur doloremque rerum ducimus excepturi blanditiis natus
        reiciendis, fugit accusamus illo, pariatur consectetur deleniti eum
        dolorem. Minima iusto quas dignissimos beatae, voluptatum, ad eum
        repudiandae possimus quibusdam, dolor porro! Sunt, perspiciatis et!
        Illum architecto est necessitatibus, esse nemo veniam. Sit eaque minus
        officia cumque culpa cum. Expedita sit vitae cum at qui maiores
        quibusdam vero, sint assumenda aliquid veritatis mollitia sapiente iure
        molestiae atque. Tempora, nisi ullam. Architecto reiciendis vero eveniet
        natus, suscipit iste error praesentium. Vitae, exercitationem quidem vel
        expedita doloremque voluptatibus labore amet ad quam qui. Cum, nostrum
        minus tempore natus nam officiis quis voluptatum expedita. Eveniet
        facere pariatur voluptate? Ipsum, ratione. Voluptatibus, ratione. Ullam,
        minus. Iusto vero necessitatibus nemo, animi perspiciatis aperiam nulla
        omnis reiciendis doloremque autem labore iure. Soluta est ullam aliquid
        sit, quaerat tempore quod sequi aliquam, impedit ducimus autem eaque.
        Cupiditate animi exercitationem quibusdam sit sapiente alias provident
        soluta. Reiciendis nam sint quo corporis esse? Nesciunt unde aliquid
        sequi dolore omnis nulla reprehenderit. Veritatis distinctio aut a
        voluptatibus obcaecati. Animi? Est recusandae rem labore esse aspernatur
        repellat numquam animi aliquam voluptatibus quis, illum molestias fugiat
        iure repudiandae tenetur tempore! Cupiditate earum id ea sequi quo
        laborum temporibus placeat est aspernatur? Incidunt voluptas beatae
        fugit, nemo qui doloribus consequatur iure? Ut amet quis sunt vitae
        doloribus, ducimus dolorum quaerat similique commodi esse, ipsam
        voluptatem, doloremque repudiandae soluta aperiam tempore pariatur
        exercitationem! Dignissimos inventore ex a optio, quasi tempore
        necessitatibus sint harum fugit unde aspernatur tenetur vero. Eligendi
        corrupti, deleniti nulla vero, adipisci earum eius corporis odio, ipsam
        sit nihil amet ullam.
      </p>
      <br />
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum
        voluptatem placeat, quas iure molestiae dolores dicta, provident
        doloremque nemo, voluptates aperiam repellendus eligendi amet. Ipsam,
        similique animi. In, iure nemo. Repudiandae molestias fuga molestiae
        quos exercitationem, tempore quibusdam aliquid fugiat culpa aperiam
        saepe, aliquam laborum natus quasi modi possimus ipsum, at voluptatibus
        eum expedita recusandae deleniti? Reprehenderit nemo inventore odit?
        Suscipit, ab rerum dolores laborum ducimus veniam vitae adipisci dolorem
        pariatur est aliquid, voluptatum quasi non doloremque reprehenderit!
        Praesentium voluptas voluptatum similique perspiciatis nemo aut quas
        vitae! Fugiat, nostrum nulla? Repellat quod assumenda laborum quis
        cupiditate, modi, nostrum nam dolore quos fugit hic, obcaecati totam.
        Aperiam accusantium saepe nam repellat amet iste iure ratione ullam rem
        temporibus quam, omnis hic. Expedita assumenda debitis sapiente suscipit
        ex, hic maxime. Voluptates saepe suscipit magnam neque harum inventore
        earum provident nesciunt tempora? Voluptate perspiciatis nisi fugit sunt
        saepe iure dolorem tempore consequuntur adipisci! Vel corporis eum
        commodi labore accusamus deserunt sit, saepe nisi ad perferendis
        voluptates doloribus fuga. Facere harum at tempore a, quas, eligendi
        officia pariatur autem amet, esse ab vitae accusamus. Molestias, earum
        aperiam fugit voluptates nostrum adipisci odit cum, quod sed fugiat quae
        culpa temporibus voluptatem aliquid laboriosam commodi repudiandae ipsam
        tenetur dolores, neque excepturi blanditiis. Minus adipisci harum
        dolorem. Dolorem architecto incidunt labore nesciunt consequatur
        voluptatum sit dolore in animi! Assumenda esse dolore, neque id placeat
        laboriosam, aperiam non dolores, minima corrupti quidem temporibus
        reprehenderit? Quaerat, voluptatibus? Sit, quaerat. Facilis vitae in
        quibusdam ipsam ad eius fuga repellendus culpa, necessitatibus maiores,
        voluptatem cum, nemo eaque? Illo eaque rerum aut id quasi, tempora
        tempore perferendis quam autem, in sequi doloribus. Quo, id? Et
        voluptates deleniti rem similique perferendis tempore iusto harum ut
        sunt? Dolorem placeat autem dicta, aperiam possimus perferendis quia
        illo, odio non incidunt blanditiis debitis molestiae omnis sint. Eum,
        quod fuga! Quis sapiente pariatur quae vitae dignissimos assumenda
        facilis officiis qui ipsa cum nihil dolor eos fugiat quia perferendis
        impedit sunt iure, saepe eligendi blanditiis natus inventore? Molestiae!
        Culpa, velit repellat? Pariatur sint est qui perspiciatis praesentium
        deserunt culpa itaque alias excepturi atque a aliquam, minus hic
        quibusdam quod at tempore omnis deleniti cupiditate? Nisi est harum qui.
        Cumque impedit ex voluptate eos laborum. Perferendis rerum tenetur, amet
        accusamus nostrum corrupti aspernatur numquam, tempora aperiam vero
        fugit sapiente doloribus vel, debitis excepturi modi cum officiis neque
        ullam animi? Ab blanditiis nulla quaerat sed ipsum harum est et unde ex
        soluta? Atque beatae a vero eius illum autem ad unde incidunt est esse?
        Sed consectetur ad laborum obcaecati deserunt. Incidunt consectetur
        deleniti quis ratione voluptatibus aperiam quia reprehenderit aspernatur
        quaerat beatae vero modi quo voluptas eius dolores, ex adipisci
        doloremque sapiente porro nulla tempore officiis aliquam delectus.
        Alias, officiis! Laudantium quasi nostrum debitis sunt voluptas dolores
        est. Nulla id mollitia, dolor ipsam iure repellat nisi nostrum ullam?
        Reiciendis ex id rerum expedita animi quam reprehenderit sit eius
        corrupti magnam! Illo excepturi ullam dignissimos est voluptatum, velit
        delectus quas sit explicabo officiis facilis adipisci magni voluptatem
        esse eius exercitationem soluta error recusandae ut, pariatur vel earum
        odio quo maiores. Doloremque! Accusantium maxime quis illum perferendis
        iure aperiam quae eligendi iste voluptas. Exercitationem molestiae,
        unde, praesentium sapiente mollitia veritatis possimus minima ipsam est
        delectus illo ab porro nobis eum! Dolorum, placeat. Sunt suscipit
        officia modi eveniet corporis amet laborum sapiente cum, veniam corrupti
        laboriosam eius accusamus voluptate sint deleniti minima earum vel
        molestias ex exercitationem quae vitae iste? Magnam, provident
        aspernatur! Totam neque numquam nisi eius dolorum veritatis, beatae
        suscipit maxime officia excepturi porro doloribus eveniet sint,
        voluptates quasi amet, unde est vel optio facere facilis adipisci veniam
        dolorem ut. Ducimus. Repellat eveniet quibusdam magnam blanditiis
        voluptatem rem dolorem vel quo porro, deserunt, aspernatur quod
        obcaecati recusandae accusantium. Aperiam suscipit illum eos maiores.
        Voluptates numquam nemo fuga fugiat vero libero esse? Veniam impedit
        architecto aspernatur a. Possimus, magnam voluptatibus nostrum error
        libero, nihil labore, optio cum eius unde necessitatibus numquam. Nemo
        commodi, quasi aspernatur voluptas quis non saepe praesentium doloribus
        temporibus! Doloribus, nesciunt architecto vel repudiandae, enim sint
        quam nulla necessitatibus voluptatibus alias debitis commodi aut tempora
        explicabo ratione consectetur esse nemo illum optio. Dolore sit
        distinctio necessitatibus facere? Omnis, ducimus.
      </p>
    </div>
  );
}
