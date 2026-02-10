import {BsHouse, BsGear, BsNewspaper, BsSunrise, BsBook, BsInfoCircle} from 'react-icons/bs'

export default (S) =>
  S.list()
    .title('Oversikt')
    .items([
      S.listItem()
        .title('Hjem')
        .child(S.document().title('Hjem').schemaType('home').documentId('singleton-home')),
      S.divider(),

      S.listItem()
        .title('Nyheter')
        .icon(BsNewspaper)
        .child(
          S.list()
            .title('VU')
            .items([
              S.listItem().title('Nyhetssaker').child(S.documentTypeList('news')),
              S.listItem().title('Medlemsnytt').child(S.documentTypeList('medlemsNytt')),
            ]),
        ),
      S.listItem()
        .title('Vårutstillingen')
        .icon(BsSunrise)
        .child(
          S.list()
            .title('VU')
            .items([
              S.listItem()
                .title('VU-Hjem')
                .icon(BsSunrise)
                .child(
                  S.document().title('Hjem').schemaType('vuSingleton').documentId('singleton-vu'),
                ),
              S.listItem()
                .title('Om')
                .icon(BsInfoCircle)
                .child(S.document().title('Om').schemaType('vuOm').documentId('om-vu')),
              S.listItem().title('Utgaver').child(S.documentTypeList('vuEdition')),
            ]),
        ),
      S.listItem()
        .title('Fotobokfestivalen')
        .icon(BsBook)
        .child(
          S.list()
            .title('FFO')
            .items([
              S.listItem()
                .title('FFO-Hjem')
                .icon(BsBook)
                .child(
                  S.document()
                    .title('FFO-Hjem')
                    .schemaType('ffoSingleton')
                    .documentId('singleton-ffo'),
                ),
              S.listItem().title('Utgaver').child(S.documentTypeList('ffoEdition')),
            ]),
        ),
      S.divider(),
      // S.listItem().title('Exhibitors').child(S.documentTypeList('exhibitor')),
      //   S.listItem()
      //     .title('Exhibitors')
      //     // .icon(MdDateRange)
      //     .child(
      //       S.list()
      //         .title('Exhibitors')
      //         .items([
      //           S.listItem()
      //             .title('All')
      //             .child(S.documentTypeList('exhibitor').title('All exhibitors')),
      //           S.listItem()
      //             .title('Accepted')
      //             // .icon(MdDateRange)
      //             .child(
      //               S.documentTypeList('exhibitor')
      //                 .title('Exhibitor')
      //                 .filter('_type == "exhibitor" && (accepted == true)'),
      //             ),
      //           S.listItem()
      //             .title('Rejected / Unassigned')
      //             .child(
      //               S.documentTypeList('exhibitor')
      //                 .title('Exhibitor')
      //                 .filter('_type == "exhibitor" && (!defined(accepted) || accepted == false)'),
      //             ),
      //         ]),
      //     ),
      // S.listItem().title('Products').child(S.documentTypeList('product')),

      S.listItem()
        .title('Settings')
        .icon(BsGear)
        .child(
          S.document().title('Settings').schemaType('settings').documentId('singleton-settings'),
        ),
      // ...S.documentTypeListItems().filter(
      //   (listItem) =>
      //     !['home', 'settings'].includes(listItem.getId()),
      // ),
    ])
