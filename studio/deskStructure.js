import S from '@sanity/desk-tool/structure-builder'

export default () =>
S.list()
    .title('Content')
    .items([
        S.listItem()
        .title('Main Banner')
        .child(
            S.document()
            .schemaType('carousel')
            .documentId('4f0b027b-96d0-4592-a44c-86c1478f4975')
        ),
        S.listItem()
        .title('About')
        .child(
            S.document()
            .schemaType('aboutMe')
            .documentId('424964ec-46a0-4804-828d-8f3015a604f0')
        ),
        S.listItem()
        .title('Work')
        .child(
            S.document()
            .schemaType('work')
            .documentId('6b9a50e8-13f8-4617-9a35-b1de0b80631d')
        ),
        S.listItem()
        .title('Resources')
        .child(
            S.document()
            .schemaType('resources')
            .documentId('afbc0779-1bc4-419a-86be-cd7778adce43')
        ),
        S.listItem()
        .title('Contact')
        .child(
            S.document()
            .schemaType('contact')
            .documentId('232ef992-afd0-4010-b072-1d8da83fe8a3')
        ),
        S.listItem()
        .title('Privacy Policy')
        .child(
            S.document()
            .schemaType('privacy')
            .documentId('a6a5e5d1-826a-4130-ab43-312f80b3b9b2')
        ),
        ...S.documentTypeListItems().filter(listItem => ['location'].includes(listItem.getId()))
    ])