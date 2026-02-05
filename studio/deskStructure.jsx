import {
  BsHouse,
  BsGear,

} from 'react-icons/bs'

export default (S) =>
  S.list()
    .title('Oversikt')
    .items([
      S.listItem()
        .title('Hjem')
        .child(S.document().title('Hjem').schemaType('home').documentId('singleton-home')),
               S.listItem()
                  .title('Nyheter')
                  .icon(BsHouse)
                  .child(
                    S.documentTypeList('news')
                      .title('Nyheter')
                  ),
      // S.listItem()
      //   .title('Sub Pages')
      //   .icon(BsLayoutTextWindowReverse)
      //   .child(
      //     S.list()
      //       .title('Sub Pages')
      //       .items([
      //         S.listItem()
      //           .title('Custom Type')
      //           .icon(BsPencil)
      //           .child(
      //             S.document()
      //               .title('Custom Type')
      //               .schemaType('customType')
      //               .documentId('singleton-custom'),
      //           ),
      //         S.listItem()
      //           .title('Info')
      //           .icon(BsInfoCircle)
      //           .child(S.document().title('Info').schemaType('info').documentId('singleton-info')),
      //         S.listItem()
      //           .title('Privacy')
      //           .icon(BsFileLock)
      //           .child(
      //             S.document()
      //               .title('Privacy')
      //               .schemaType('privacy')
      //               .documentId('singleton-privacy'),
      //           ),
      //         S.listItem()
      //           .title('Buy')
      //           .icon(BsCart3)
      //           .child(S.document().title('Buy').schemaType('buy').documentId('singleton-buy')),
      //       ]),
      //   ),
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
