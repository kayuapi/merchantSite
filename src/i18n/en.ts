import { TranslationMessages } from 'ra-core';
import englishMessages from 'ra-language-english';

const customEnglishMessages: TranslationMessages = {
    ...englishMessages,
    pos: {
        help: {
          manual: 'Manual',
          instruction: 'Please click the link below to view the manual',
          linkToManual: 'link to manual',
          changelog: 'Changelog',
        },
        banner: {
          name: 'Banner',
          addBanner: 'Add banner',
          changeBanner: 'Change banner',
        },
        action: {
          saved: 'Saved',
          saving: 'Saving...',
          savePage: 'Save page',
          ok: 'OK',
        },
        orderMemo: {
          name: 'Order memo',
        },
        menu: {
          categoryModeOn: 'Sort Category Mode: On',
          categoryModeSaving: 'Sort Category Mode: Submitting...',
          categoryModeOff: 'Sort Category Mode: Off',
          aLaCarte: 'A la carte',
          combo: 'Combo',
          dragMe: 'DRAG ME',
          choose: 'Choose',
          addDishes: 'Click to add dishes',
          unavailable: 'Unavailable',
          aLaCarteVariantSelection: 'A La Carte Variant Selection',
          productVariantName: 'Name',
          unitPrice: 'Unit Price',
          quantity: 'Quantity',
          addVariant: 'Add Variant',
          aLaCarteNameExample: 'e.g: Variant 1',
          aLaCartePriceExample: 'e.g: RM 5',
          comboVariantSelection: 'Combo Variant Selection',
          addSection: 'Add Section',
          addItem: 'Add item',
          required: 'Required',
          optional: 'Optional',
          comboTitleExample: 'Choice of Beverage',
          comboNameExample: 'e.g: Lemon tea',
          comboPriceExample: 'e.g: RM 1',
          addImage: 'Add image',
          changeImage: 'Change image',
          modifyDescriptionAndMore: 'Modify description and more',
          descriptionPopUp: {
            deleteImage: 'Delete image',
            description: 'Description',
          },
          menu: 'Menu',
          sales: 'Sales',
          catalog: 'Catalog',
          customers: 'Customers',
          alertToContinue: {
            unpublishTitle: 'Are you sure you want to unpublish this category?',
            unpublishContent: 'The tab and all menu items in the tabs will be unpublished, please press "Continue" to confirm.',
            unpublishInProgressAction: 'Unpublishing ...',
            unpublishContinueAction: 'Continue to unpublish',
            deleteTitle: 'Are you sure you want to delete this category?',
            deleteContent: 'The tab and all menu items in the tabs will be deleted, please press "Continue" to confirm.',
            deleteInProgressAction: 'Deleting ...',
            deleteContinueAction: 'Continue to delete',
          },
        },
        notification: {
          saved_successfully: 'Saved successfully!',
          issue_addding_new_category_duplicate_category_name: 'Issue adding new category: duplicated category name',
          issue_saving_new_category_duplicate_category_name: 'Issue saving category: duplicated category name',
          fill_in_category_name: 'Please fill in the category name before creating another category',
          order_memo_copied: 'Copied',
          saved_before_adding_new_category: 'Please save this category before adding a new category.',
          saved_before_deleting_another_category: 'Please save this category before deleting another category',
          saved_before_unpublishing_another_category: 'Please save this category before unpublishing another category',
          saved_first: 'Please save first',
          cannot_switch_tab_when_saving: 'Cannot switch tab when saving',
          cannot_save_empty_category_name: 'Cannot save empty category name',
          cannot_switch_tab_current_tab_empty: 'Fill in a category name and save first or press "x" to delete the category',
          cannot_delete_while_saving: 'Cannot delete category while saving',
          cannot_unpublish_while_saving: 'Cannot unpublish category while saving',
          fill_in_name_and_save: 'Fill in category name and save first'
        },
        search: 'Search',
        configuration: 'Configuration',
        language: 'Language',
        theme: {
            name: 'Theme',
            light: 'Light',
            dark: 'Dark',
        },
        dashboard: {
            monthly_revenue: 'Monthly Revenue',
            month_history: '30 Day Revenue History',
            monthly_order: 'Monthly Order',
            monthly_order_history: '30 Day Order History',
            today_order: 'Today Order',
            new_orders: 'New Orders',
            pending_reviews: 'Pending Reviews',
            new_customers: 'New Customers',
            pending_orders: 'Pending Orders',
            order: {
                items:
                    'by %{customer_name}, one item |||| by %{customer_name}, %{nb_items} items',
            },
            welcome: {
              hi: 'Hi',
              title: 'Welcome to CHM ordering system admin site',
              subtitle:
                  "We express our gratitude for using the system. If you encounter any problems, feel free to contact us.",
              contact_by_facebook_button: 'Messenger us',
              contact_by_whatsapp_button: 'Whatsapp us at +60125281994',
            },
        },
    },
    resources: {
        help: {
          name: 'Help',
        },
        orderMemo: {
          name: 'Order Memo |||| Order Memos',
          filters: {
            date_range: 'Date range of received orders',
            today: 'Today',
            next_week: 'Next week',
            this_week: 'This week',
            last_week: 'Last week',
            next_month: 'Next month',
            this_month: 'This month',
            last_month: 'Last month',
            earlier: 'Earlier',
            fulfillmentMethods: 'Fulfillment methods',
          }
        },
        menus: {
          name: 'Published Menu',
        },
        unpublishedCategories: {
          name: 'Unpublished Menu',
        },
        fulfillmentMethods: {
          name: 'Fulfillment Method |||| Fulfillment Methods',
          data: {
              all: 'All',
              delivery: 'Delivery',
              selfPickup: 'Self Pickup',
              dineIn: 'Dine In',
          },
        },
        customers: {
            name: 'Customer |||| Customers',
            fields: {
                commands: 'Orders',
                first_seen: 'First seen',
                groups: 'Segments',
                last_seen: 'Last seen',
                last_seen_gte: 'Visited Since',
                name: 'Name',
                total_spent: 'Total spent',
                password: 'Password',
                confirm_password: 'Confirm password',
            },
            filters: {
                last_visited: 'Last visited',
                today: 'Today',
                this_week: 'This week',
                last_week: 'Last week',
                this_month: 'This month',
                last_month: 'Last month',
                earlier: 'Earlier',
                has_ordered: 'Has ordered',
                has_newsletter: 'Has newsletter',
                group: 'Segment',
            },
            fieldGroups: {
                identity: 'Identity',
                address: 'Address',
                stats: 'Stats',
                history: 'History',
                password: 'Password',
                change_password: 'Change Password',
            },
            page: {
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch:
                    'The password confirmation is not the same as the password.',
            },
        },
        commands: {
            name: 'Order |||| Orders',
            amount: '1 order |||| %{smart_count} orders',
            title: 'Order %{reference}',
            fields: {
                basket: {
                    delivery: 'Delivery',
                    reference: 'Reference',
                    quantity: 'Quantity',
                    sum: 'Sum',
                    tax_rate: 'Tax Rate',
                    total: 'Total',
                    unit_price: 'Unit Price',
                },
                customer_id: 'Customer',
                date_gte: 'Passed Since',
                date_lte: 'Passed Before',
                total_gte: 'Min amount',
                status: 'Status',
                returned: 'Returned',
            },
        },
        invoices: {
            name: 'Invoice |||| Invoices',
            fields: {
                date: 'Invoice date',
                customer_id: 'Customer',
                command_id: 'Order',
                date_gte: 'Passed Since',
                date_lte: 'Passed Before',
                total_gte: 'Min amount',
                address: 'Address',
            },
        },
        products: {
            name: 'Poster |||| Posters',
            fields: {
                category_id: 'Category',
                height_gte: 'Min height',
                height_lte: 'Max height',
                height: 'Height',
                image: 'Image',
                price: 'Price',
                reference: 'Reference',
                stock_lte: 'Low Stock',
                stock: 'Stock',
                thumbnail: 'Thumbnail',
                width_gte: 'Min width',
                width_lte: 'Max width',
                width: 'Width',
            },
            tabs: {
                image: 'Image',
                details: 'Details',
                description: 'Description',
                reviews: 'Reviews',
            },
        },
        categories: {
            name: 'Category |||| Categories',
            fields: {
                products: 'Products',
            },
        },
        reviews: {
            name: 'Review |||| Reviews',
            amount: '1 review |||| %{smart_count} reviews',
            relative_to_poster: 'Review on poster',
            detail: 'Review detail',
            fields: {
                customer_id: 'Customer',
                command_id: 'Order',
                product_id: 'Product',
                date_gte: 'Posted since',
                date_lte: 'Posted before',
                date: 'Date',
                comment: 'Comment',
                rating: 'Rating',
            },
            action: {
                accept: 'Accept',
                reject: 'Reject',
            },
            notification: {
                approved_success: 'Review approved',
                approved_error: 'Error: Review not approved',
                rejected_success: 'Review rejected',
                rejected_error: 'Error: Review not rejected',
            },
        },
        segments: {
            name: 'Segment |||| Segments',
            fields: {
                customers: 'Customers',
                name: 'Name',
            },
            data: {
                compulsive: 'Compulsive',
                collector: 'Collector',
                ordered_once: 'Ordered once',
                regular: 'Regular',
                returns: 'Returns',
                reviewer: 'Reviewer',
            },
        },
    },
};

export default customEnglishMessages;