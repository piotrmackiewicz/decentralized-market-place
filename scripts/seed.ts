import { ethers } from 'hardhat';

async function seed() {
  let marketAddress = '0x9B639C263a5a4d51f87C94eb0Ebe34c4f89ea24B';

  const market = await ethers.getContractAt('Market', marketAddress);

  const accounts = await ethers.getSigners();
  const shopOwner = accounts[1];
  const buyer = accounts[2];
  const paymentAddress = accounts[9];
  let shop1, shop1Address, shop2, shop2Address;

  // Create Categories
  let transaction = await market.createCategory('Electronics');
  await transaction.wait();
  transaction = await market.createCategory('Clothes');
  await transaction.wait();
  transaction = await market.createCategory('House');
  await transaction.wait();
  transaction = await market.createCategory('Other');
  await transaction.wait();

  // Create Shops
  transaction = await market
    .connect(shopOwner)
    .createStore('Test Shop 1', paymentAddress.getAddress());
  await transaction.wait();
  shop1Address = await market.getShopAddress(0);
  shop1 = await ethers.getContractAt('Shop', shop1Address);

  transaction = await market
    .connect(shopOwner)
    .createStore('Test Shop 2', paymentAddress.getAddress());
  await transaction.wait();
  shop2Address = await market.getShopAddress(1);
  shop2 = await ethers.getContractAt('Shop', shop2Address);

  // Create Offers Shop 1
  transaction = await shop1
    .connect(shopOwner)
    .createOffer(
      'Computer',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum metus dolor, sollicitudin id tellus in, hendrerit facilisis tellus. In porttitor porttitor dapibus. Cras maximus, nulla vitae vestibulum molestie, tellus tortor mollis turpis, eu vulputate velit felis nec augue. In vulputate, metus ac semper lacinia, turpis diam mattis urna, non gravida enim ante ac est. Sed mattis iaculis libero, sit amet tempor ante tristique sed. Nullam condimentum lorem non fermentum pretium. Maecenas est est, tristique pharetra luctus in, ultrices vitae nisi. Nullam ex magna, ornare eget enim quis, laoreet finibus libero. Phasellus lobortis metus lacus, nec porta ipsum egestas id. Ut dignissim leo ut nunc sollicitudin bibendum. Praesent porttitor id mauris in blandit.',
      [
        'https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/1/1a/Crystal_Project_computer.png',
        'https://m.media-amazon.com/images/I/718sn7oOcfL.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Amiga500_system1.jpg/800px-Amiga500_system1.jpg',
      ],
      'QmcUQiBLEg6cz2hr7vuFTbdaCi67udMT3VLKhtyrwq7R24',
      5,
      ethers.utils.parseUnits('0.97'),
      0
    );
  transaction.wait();

  transaction = await shop1
    .connect(shopOwner)
    .createOffer(
      'Hoodie',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ullamcorper pretium blandit. Integer blandit ultricies pharetra. Sed eu ante turpis. Curabitur ac orci ac quam laoreet bibendum. Nam leo orci, pretium eget ex tristique, fringilla convallis felis. Aliquam placerat velit ac magna efficitur rutrum. Nullam ut tristique sapien. In purus massa, malesuada sed erat nec, accumsan tempor magna. Nunc venenatis ornare lectus, dictum cursus nunc ullamcorper egestas. Curabitur gravida auctor eros, ut gravida massa venenatis vitae.',
      [
        'https://skilly.pl/environment/cache/images/500_500_productGfx_564/front-brown.jpg',
        'https://inrablew.pl/wp-content/uploads/2022/02/INRABLEW-GREY-BOXY-HOODIE.jpg',
        'https://serumstudios.pl/wp-content/uploads/2021/07/11-1.jpg',
        'https://hazel21.com/wp-content/uploads/2022/03/bx_green.jpg',
      ],
      'QmdKewGCfDwktF1KcDto1GWH62K9QbterMbE6kwvLDJGkQ',
      10,
      ethers.utils.parseUnits('0.023'),
      1
    );
  transaction.wait();

  transaction = await shop1
    .connect(shopOwner)
    .createOffer(
      'Vacuum',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a est sollicitudin, pulvinar lorem eu, porttitor felis. Nulla euismod diam eu risus aliquam molestie. Phasellus porttitor turpis vitae auctor blandit. Vestibulum gravida eros orci, eu hendrerit nisl sagittis sit amet. Nam fermentum placerat bibendum. Praesent egestas erat vestibulum mi feugiat dignissim. In placerat tellus nec fringilla vehicula. Sed cursus, nunc ac sollicitudin euismod, eros mauris euismod tellus, nec tristique dolor dui sit amet magna. Quisque dictum nulla sit amet bibendum lobortis. Praesent eu vestibulum dolor, in eleifend nunc. Nulla ut velit porta, ullamcorper tellus id, posuere ante. Pellentesque egestas dui vel arcu blandit hendrerit. Nulla efficitur eleifend ultricies.',
      [
        'https://www.aze.com.pl/userdata/public/gfx/8567/194350.jpg',
        'https://www.mackoviahracky.sk/image/handle/image_bank/330219-e-smoby-vysavac.jpg',
        'https://www.geekbuying.pl/21295-large_default/dreame-h11-max-10000pa-cordless-wet-dry-smart-vertical-vacuum-cleaner-with-self-cleaning-system.jpg',
      ],
      'QmTw2564UcZ9J5Hs5UwJGjfLhuZwNC9DidS8c9CSzEDXx7',
      20,
      ethers.utils.parseUnits('0.068'),
      2
    );
  transaction.wait();

  transaction = await shop1
    .connect(shopOwner)
    .createOffer(
      'Mask',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a est sollicitudin, pulvinar lorem eu, porttitor felis. Nulla euismod diam eu risus aliquam molestie. Phasellus porttitor turpis vitae auctor blandit. Vestibulum gravida eros orci, eu hendrerit nisl sagittis sit amet. Nam fermentum placerat bibendum. Praesent egestas erat vestibulum mi feugiat dignissim. In placerat tellus nec fringilla vehicula. Sed cursus, nunc ac sollicitudin euismod, eros mauris euismod tellus, nec tristique dolor dui sit amet magna. Quisque dictum nulla sit amet bibendum lobortis. Praesent eu vestibulum dolor, in eleifend nunc. Nulla ut velit porta, ullamcorper tellus id, posuere ante. Pellentesque egestas dui vel arcu blandit hendrerit. Nulla efficitur eleifend ultricies.',
      [
        'https://c-co.niceshops.com/upload/image/product/large/default/18168_f507eaa1.jpg',
        'https://i.etsystatic.com/30393646/r/il/ca72b9/4128843248/il_570xN.4128843248_25rl.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/f/f1/Protest_ACTA_2012-02-11_-_Toulouse_-_05_-_Anonymous_guy_with_a_scarf.jpg',
        'https://dictionary.cambridge.org/pl/images/thumb/mask_noun_002_22549.jpg',
      ],
      'QmY8zDCNjkcR7Mg46jrxdxwPEUf1wzCFTgf4o8oZWwUuon',
      90,
      ethers.utils.parseUnits('0.0029'),
      3
    );
  transaction.wait();

  // Create Offers Shop 2
  transaction = await shop2
    .connect(shopOwner)
    .createOffer(
      'Rocket',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a est sollicitudin, pulvinar lorem eu, porttitor felis. Nulla euismod diam eu risus aliquam molestie. Phasellus porttitor turpis vitae auctor blandit. Vestibulum gravida eros orci, eu hendrerit nisl sagittis sit amet. Nam fermentum placerat bibendum. Praesent egestas erat vestibulum mi feugiat dignissim. In placerat tellus nec fringilla vehicula. Sed cursus, nunc ac sollicitudin euismod, eros mauris euismod tellus, nec tristique dolor dui sit amet magna. Quisque dictum nulla sit amet bibendum lobortis. Praesent eu vestibulum dolor, in eleifend nunc. Nulla ut velit porta, ullamcorper tellus id, posuere ante. Pellentesque egestas dui vel arcu blandit hendrerit. Nulla efficitur eleifend ultricies.',
      [
        'https://cdn.mos.cms.futurecdn.net/qTmvroik2NtHVGsfCHyyxF-1200-80.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/9/9a/Soyuz_TMA-9_launch.jpg',
        'https://i.natgeofe.com/n/88420695-3555-4f84-90be-8f7903a1a57e/01_58_51a_remotesite-2-frame-8_square.jpg',
        'https://image.cnbcfm.com/api/v1/image/107074800-1655130083779-Astra-1534562715045351424-img1.jpg',
      ],
      'QmbqzgsFJeTgowDP2Q2JoKX3cfRFJ5VQj4iNcf5unCCwri',
      1,
      ethers.utils.parseUnits('38.77'),
      0
    );
  transaction.wait();

  transaction = await shop2
    .connect(shopOwner)
    .createOffer(
      'Sweater',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a est sollicitudin, pulvinar lorem eu, porttitor felis. Nulla euismod diam eu risus aliquam molestie. Phasellus porttitor turpis vitae auctor blandit. Vestibulum gravida eros orci, eu hendrerit nisl sagittis sit amet. Nam fermentum placerat bibendum. Praesent egestas erat vestibulum mi feugiat dignissim. In placerat tellus nec fringilla vehicula. Sed cursus, nunc ac sollicitudin euismod, eros mauris euismod tellus, nec tristique dolor dui sit amet magna. Quisque dictum nulla sit amet bibendum lobortis. Praesent eu vestibulum dolor, in eleifend nunc. Nulla ut velit porta, ullamcorper tellus id, posuere ante. Pellentesque egestas dui vel arcu blandit hendrerit. Nulla efficitur eleifend ultricies.',
      [
        'https://konturek.pl/wp-content/uploads/2021/08/konturek-royal-cable-sweater-01.jpg',
        'https://media.weareknitters.pl/media/catalog/product/cache/77e4cb0bb443057d4cdf9dcfaa8ea8ac/k/n/knitting-kit-recycled-yarn-pagolin-sweater-grey_en-01.jpeg',
        'https://cdn.shopify.com/s/files/1/0033/7854/4729/products/Sweaterno18full_7a1246c6-86fd-4856-954c-b51827a5a167_720x@2x.jpg',
        'https://robotyreczne.com/userdata/public/gfx/3062/cable-knitted-sweater.jpg',
      ],
      'QmVbtJY3obVv23LN9wJNoLFKpXWuQ4FE4Ar32JsBudopCP',
      40,
      ethers.utils.parseUnits('0.013'),
      1
    );
  transaction.wait();

  transaction = await shop2
    .connect(shopOwner)
    .createOffer(
      'Cleaning Cloth',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a est sollicitudin, pulvinar lorem eu, porttitor felis. Nulla euismod diam eu risus aliquam molestie. Phasellus porttitor turpis vitae auctor blandit. Vestibulum gravida eros orci, eu hendrerit nisl sagittis sit amet. Nam fermentum placerat bibendum. Praesent egestas erat vestibulum mi feugiat dignissim. In placerat tellus nec fringilla vehicula. Sed cursus, nunc ac sollicitudin euismod, eros mauris euismod tellus, nec tristique dolor dui sit amet magna. Quisque dictum nulla sit amet bibendum lobortis. Praesent eu vestibulum dolor, in eleifend nunc. Nulla ut velit porta, ullamcorper tellus id, posuere ante. Pellentesque egestas dui vel arcu blandit hendrerit. Nulla efficitur eleifend ultricies.',
      [
        'https://centralstore.net/wp-content/uploads/2018/02/sciereczki-uniwersalna-z-mikrofibry.jpg',
      ],
      'QmXqy3eNsPc7HMhnfqXxyRYzgUuVujs8VtdC21wF3crLDb',
      200,
      ethers.utils.parseUnits('0.00023'),
      2
    );
  transaction.wait();

  transaction = await shop2
    .connect(shopOwner)
    .createOffer(
      'Car',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a est sollicitudin, pulvinar lorem eu, porttitor felis. Nulla euismod diam eu risus aliquam molestie. Phasellus porttitor turpis vitae auctor blandit. Vestibulum gravida eros orci, eu hendrerit nisl sagittis sit amet. Nam fermentum placerat bibendum. Praesent egestas erat vestibulum mi feugiat dignissim. In placerat tellus nec fringilla vehicula. Sed cursus, nunc ac sollicitudin euismod, eros mauris euismod tellus, nec tristique dolor dui sit amet magna. Quisque dictum nulla sit amet bibendum lobortis. Praesent eu vestibulum dolor, in eleifend nunc. Nulla ut velit porta, ullamcorper tellus id, posuere ante. Pellentesque egestas dui vel arcu blandit hendrerit. Nulla efficitur eleifend ultricies.',
      [
        'https://www.tabletowo.pl/wp-content/uploads/2021/12/apple-car-1946c46a51e6c13a9286261261fef3a4.jpeg',
        'https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5d35eacaf1176b0008974b54%2F0x0.jpg',
        'https://cdni.autocarindia.com/utils/imageresizer.ashx?n=https://cms.haymarketindia.net/model/uploads/modelimages/Pravaig-Defy-281120221416.jpg',
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2019-honda-civic-sedan-1558453497.jpg',
      ],
      'QmQJ9RMQnsxdJ3qtFbo3e7ccPRcekKDt1XkqGwAAHTcLb6',
      80,
      ethers.utils.parseUnits('7.75'),
      3
    );
  transaction.wait();

  // Buy Products
  transaction = await shop1
    .connect(buyer)
    .buyProduct(0, 1, { value: ethers.utils.parseUnits('0.97') });
  await transaction.wait();

  // TODO: if two buys of same offer takes place in the same time, quantity in offers
  transaction = await shop1
    .connect(buyer)
    .buyProduct(0, 4, { value: ethers.utils.parseUnits('3.88') });
  await transaction.wait();

  transaction = await shop1
    .connect(buyer)
    .buyProduct(1, 2, { value: ethers.utils.parseUnits('0.046') });
  await transaction.wait();

  transaction = await shop2
    .connect(buyer)
    .buyProduct(1, 5, { value: ethers.utils.parseUnits('0.065') });
  await transaction.wait();

  // Suspend Shop 2
  transaction = await shop2.connect(shopOwner).suspend();
  await transaction.wait();
}

seed();
