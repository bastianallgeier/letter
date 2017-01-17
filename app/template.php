<letter>

  <header>
    <address>
      <from>
        <name><?= $name ?></name>
        <street><?= $street ?></street>
        <city><?= $city ?></city>
        <?php if(!empty($country)): ?>
        <country><?= $country ?></country>
        <?php endif ?>
      </from>
      <to contenteditable>
        <?= $placeholders['address'] ?>
      </to>
    </address>
  </header>

  <main>
    <subject contenteditable><?= $placeholders['subject'] ?></subject>
    <date contenteditable><?= $date ?></date>
    <text contenteditable>
      <?= $placeholders['text'] ?>
    </text>
    <signature>
      <closing contenteditable><?= $closing ?></closing>
      <name contenteditable><?= $name ?></name>
      <?php if($signature): ?>
      <img src="<?= $signature ?>">
      <?php endif ?>
    </signature>
  </main>

  <footer>
    
    <address>
      <name><?= $name ?></name>
      <street><?= $street ?></street>
      <city><?= $city ?></city>
      <?php if(!empty($country)): ?>
      <country><?= $country ?></country>
      <?php endif ?>
    </address>
    
    <contact>
      
      <?php if(!empty($phone)): ?>
      <phone>
        <label><?= $labels['phone'] ?></label> <?= $phone ?>
      </phone>
      <?php endif ?>

      <?php if(!empty($mobile)): ?>
      <mobile>
        <label><?= $labels['mobile'] ?></label> <?= $mobile ?>
      </mobile>
      <?php endif ?>
      
      <?php if(!empty($email)): ?>
      <email>
        <label><?= $labels['email'] ?></label> <?= $email ?>
      </email>
      <?php endif ?>

      <?php if(!empty($website)): ?>
      <website>
        <label><?= $labels['website'] ?></label> <?= $website ?>
      </website>
      <?php endif ?>
    
    </contact>
    
    <?php if($bank !== false): ?>
    <bank>

      <?php if(!empty($bank)): ?>
      <name>
        <label><?= $labels['bank'] ?></label> <?= $bank ?>
      </name>
      <?php endif ?>

      <?php if(!empty($iban)): ?>
      <iban>
        <label><?= $labels['iban'] ?></label> <?= $iban ?>
      </iban>
      <?php endif ?>

      <?php if(!empty($bic)): ?>
      <bic>
        <label><?= $labels['bic'] ?></label> <?= $bic ?>
      </bic>
      <?php endif ?>

    </bank>
    <?php endif ?>

    <?php if(!empty($vatId) || !empty($taxId)): ?>
    <info>

      <?php if(!empty($vatId)): ?>
      <vatid>
        <label><?= $labels['vatId'] ?></label> <?= $vatId ?>
      </vatid>
      <?php endif ?>

      <?php if(!empty($taxId)): ?>
      <taxid>
        <label><?= $labels['taxId'] ?></label> <?= $taxId ?>
      </taxid>
      <?php endif ?>

    </info>
    <?php endif ?>

  </footer>
</letter>