/* tslint:disable: array-type max-line-length no-trailing-whitespace */
export type EnergyAccount = {
    /**
     * The ID of the account.  To be created in accordance with CDR ID permanence requirements
     */
    accountId: string;
    /**
     * Optional identifier of the account as defined by the data holder.  This must be the value presented on physical statements (if it exists) and must not be used for the value of accountId
     */
    accountNumber?: string | null;
    /**
     * An optional display name for the account if one exists or can be derived.  The content of this field is at the discretion of the data holder
     */
    displayName?: string | null;
    /**
     * The date that the account was created or opened
     */
    creationDate: string;
    [k: string]: unknown;
  } & {
    /**
     * The array of plans containing service points and associated plan details
     */
    plans: {
      /**
       * Optional display name for the plan provided by the customer to help differentiate multiple plans
       */
      nickname?: string | null;
      /**
       * An array of servicePointIds, representing NMIs, that this plan is linked to.  If there are no service points allocated to this plan then an empty array would be expected
       */
      servicePointIds: string[];
      planOverview: {
        /**
         * The name of the plan if one exists
         */
        displayName?: string | null;
        /**
         * The start date of the applicability of this plan
         */
        startDate: string;
        /**
         * The end date of the applicability of this plan
         */
        endDate?: string | null;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    }[];
    [k: string]: unknown;
  };
  export interface EnergyAccountBase {
    /**
     * The ID of the account.  To be created in accordance with CDR ID permanence requirements
     */
    accountId: string;
    /**
     * Optional identifier of the account as defined by the data holder.  This must be the value presented on physical statements (if it exists) and must not be used for the value of accountId
     */
    accountNumber?: string | null;
    /**
     * An optional display name for the account if one exists or can be derived.  The content of this field is at the discretion of the data holder
     */
    displayName?: string | null;
    /**
     * The date that the account was created or opened
     */
    creationDate: string;
    [k: string]: unknown;
  }
  export type EnergyAccountDetail = {
    /**
     * The ID of the account.  To be created in accordance with CDR ID permanence requirements
     */
    accountId: string;
    /**
     * Optional identifier of the account as defined by the data holder.  This must be the value presented on physical statements (if it exists) and must not be used for the value of accountId
     */
    accountNumber?: string | null;
    /**
     * An optional display name for the account if one exists or can be derived.  The content of this field is at the discretion of the data holder
     */
    displayName?: string | null;
    /**
     * The date that the account was created or opened
     */
    creationDate: string;
    [k: string]: unknown;
  } & {
    /**
     * The array of plans containing service points and associated plan details
     */
    plans: {
      /**
       * Optional display name for the plan provided by the customer to help differentiate multiple plans
       */
      nickname?: string | null;
      /**
       * An array of servicePointIds, representing NMIs, that this account is linked to
       */
      servicePointIds: string[];
      planOverview: {
        /**
         * The name of the plan if one exists
         */
        displayName?: string | null;
        /**
         * The start date of the applicability of this plan
         */
        startDate: string;
        /**
         * The end date of the applicability of this plan
         */
        endDate?: string | null;
        [k: string]: unknown;
      };
      /**
       * Detail on the plan applicable to this account
       */
      planDetail: {
        /**
         * The fuel types covered by the plan
         */
        fuelType: "ELECTRICITY" | "GAS" | "DUAL";
        /**
         * Flag that indicates that the plan is contingent on the customer taking up an alternate fuel plan from the same retailer (for instance, if the fuelType is ELECTRICITY then a GAS plan from the same retailer must be taken up). Has no meaning if the plan has a fuelType of DUAL. If absent the value is assumed to be false
         */
        isContingentPlan?: boolean;
        /**
         * Charges for metering included in the plan
         */
        meteringCharges?: {
          /**
           * Display name of the charge
           */
          displayName: string;
          /**
           * Description of the charge
           */
          description?: string | null;
          /**
           * Minimum value of the charge if the charge is a range or the absolute value of the charge if no range is specified
           */
          minimumValue: string;
          /**
           * The upper limit of the charge if the charge could occur in a range
           */
          maximumValue?: string | null;
          /**
           * The charges that occur on a schedule indicates the frequency. Formatted according to [ISO 8601 Durations](https://en.wikipedia.org/wiki/ISO_8601#Durations) (excludes recurrence syntax)
           */
          period?: string | null;
          [k: string]: unknown;
        }[];
        /**
         * The details of the terms for the supply of electricity under this plan.  Is mandatory if fuelType is set to GAS or DUAL
         */
        gasContract?: {
          /**
           * Free text field containing additional information of the fees for this contract
           */
          additionalFeeInformation?: string | null;
          /**
           * The pricing model for the contract.  Contracts for gas must use SINGLE_RATE.  Note that the detail for the enumeration values are:<ul><li>**SINGLE_RATE** - all energy usage is charged at a single unit rate no matter when it is consumed. Multiple unit rates may exist that correspond to varying volumes of usage i.e. a ‘block’ or ‘step’ tariff (first 50kWh @ X cents, next 50kWh at Y cents etc.</li><li>**SINGLE_RATE_CONT_LOAD** - as above, but with an additional, separate unit rate charged for all energy usage from a controlled load i.e. separately metered appliance like hot water service, pool pump etc.</li><li>**TIME_OF_USE** - energy usage is charged at unit rates that vary dependent on time of day and day of week that the energy is consumed</li><li>**TIME_OF_USE_CONT_LOAD** - as above, but with an additional, separate unit rate charged for all energy usage from a controlled load i.e. separately metered appliance like hot water service, pool pump etc.</li><li>**FLEXIBLE** - energy usage is charged at unit rates that vary based on external factors</li><li>**FLEXIBLE_CONT_LOAD** - as above, but with an additional, separate unit rate charged for all energy usage from a controlled load i.e. separately metered appliance like hot water service, pool pump etc.</li><li>**QUOTA** - all energy usage is charged at a single fixed rate, up to a specified usage quota/allowance. All excess usage beyond the allowance is then charged at a single unit rate (may not be the best way to explain it but it is essentially a ‘subscription’ or telco style product i.e. $50/month for up to 150kWh included usage</li></ul>
           */
          pricingModel:
            | "SINGLE_RATE"
            | "SINGLE_RATE_CONT_LOAD"
            | "TIME_OF_USE"
            | "TIME_OF_USE_CONT_LOAD"
            | "FLEXIBLE"
            | "FLEXIBLE_CONT_LOAD"
            | "QUOTA";
          /**
           * Required if pricingModel is set to TIME_OF_USE.  Defines the time zone to use for calculation of the time of use thresholds
           */
          timeZone?: ("LOCAL" | "AEST") | null;
          /**
           * Flag indicating whether prices are fixed or variable
           */
          isFixed: boolean;
          /**
           * Free text description of price variation policy and conditions for the contract.  Mandatory if isFixed is true
           */
          variation?: string | null;
          /**
           * Free text field that describes what will occur on or prior to expiry of the fixed contract term or benefit period
           */
          onExpiryDescription?: string | null;
          /**
           * Payment options for this contract
           */
          paymentOption: ("PAPER_BILL" | "CREDIT_CARD" | "DIRECT_DEBIT" | "BPAY" | "OTHER")[];
          /**
           * Describes intrinsic green power for the plan.  If present then the plan includes a percentage of green power in the base plan. Should not be present for gas contracts
           */
          intrinsicGreenPower?: {
            /**
             * Percentage of green power intrinsically included in the plan
             */
            greenPercentage: string;
            [k: string]: unknown;
          } | null;
          /**
           * Required if pricing model is SINGLE_RATE_CONT_LOAD or TIME_OF_USE_CONT_LOAD or FLEXIBLE_CONT_LOAD
           */
          controlledLoad?: {
            /**
             * A display name for the controlled load tier
             */
            displayName: string;
            /**
             * A description of the controlled load tier
             */
            description?: string | null;
            /**
             * The daily supply charge (exclusive of GST) for this controlled load tier
             */
            dailyCharge: string;
            /**
             * The period for which the controlled load rate applies. Formatted according to [ISO 8601 Durations](https://en.wikipedia.org/wiki/ISO_8601#Durations) (excludes recurrence syntax)
             */
            period: string;
            /**
             * Array of controlled load rates in order of usage volume
             */
            rates: {
              /**
               * Unit price of usage per kWh (exclusive of GST)
               */
              unitPrice: string;
              /**
               * Volume in kWh that this rate applies to.  Only applicable for ‘stepped’ rates where different rates apply for different volumes of usage in a period
               */
              volume?: number | null;
              [k: string]: unknown;
            }[];
            [k: string]: unknown;
          } | null;
          /**
           * Optional list of incentives available for the contract
           */
          incentives?: {
            [k: string]: unknown;
          } | null;
          /**
           * Optional list of discounts available for the contract
           */
          discounts?: {
            [k: string]: unknown;
          } | null;
          /**
           * Optional list of charges applicable to green power
           */
          greenPowerCharges?: {
            [k: string]: unknown;
          } | null;
          /**
           * Eligibility restrictions or requirements
           */
          eligibility?: {
            [k: string]: unknown;
          } | null;
          /**
           * An array of fees applicable to the plan
           */
          fees?: {
            [k: string]: unknown;
          } | null;
          /**
           * Array of feed in tariffs for solar power
           */
          solarFeedInTariff?: {
            [k: string]: unknown;
          } | null;
          /**
           * Array of tariff periods
           */
          tariffPeriod: {
            [k: string]: unknown;
          };
          [k: string]: unknown;
        };
        /**
         * The details of the terms for the supply of electricity under this plan.  Is mandatory if fuelType is set to ELECTRICITY or DUAL
         */
        electricityContract?: {
          /**
           * Free text field containing additional information of the fees for this contract
           */
          additionalFeeInformation?: string | null;
          /**
           * The pricing model for the contract.  Contracts for gas must use SINGLE_RATE.  Note that the detail for the enumeration values are:<ul><li>**SINGLE_RATE** - all energy usage is charged at a single unit rate no matter when it is consumed. Multiple unit rates may exist that correspond to varying volumes of usage i.e. a ‘block’ or ‘step’ tariff (first 50kWh @ X cents, next 50kWh at Y cents etc.</li><li>**SINGLE_RATE_CONT_LOAD** - as above, but with an additional, separate unit rate charged for all energy usage from a controlled load i.e. separately metered appliance like hot water service, pool pump etc.</li><li>**TIME_OF_USE** - energy usage is charged at unit rates that vary dependent on time of day and day of week that the energy is consumed</li><li>**TIME_OF_USE_CONT_LOAD** - as above, but with an additional, separate unit rate charged for all energy usage from a controlled load i.e. separately metered appliance like hot water service, pool pump etc.</li><li>**FLEXIBLE** - energy usage is charged at unit rates that vary based on external factors</li><li>**FLEXIBLE_CONT_LOAD** - as above, but with an additional, separate unit rate charged for all energy usage from a controlled load i.e. separately metered appliance like hot water service, pool pump etc.</li><li>**QUOTA** - all energy usage is charged at a single fixed rate, up to a specified usage quota/allowance. All excess usage beyond the allowance is then charged at a single unit rate (may not be the best way to explain it but it is essentially a ‘subscription’ or telco style product i.e. $50/month for up to 150kWh included usage</li></ul>
           */
          pricingModel:
            | "SINGLE_RATE"
            | "SINGLE_RATE_CONT_LOAD"
            | "TIME_OF_USE"
            | "TIME_OF_USE_CONT_LOAD"
            | "FLEXIBLE"
            | "FLEXIBLE_CONT_LOAD"
            | "QUOTA";
          /**
           * Required if pricingModel is set to TIME_OF_USE.  Defines the time zone to use for calculation of the time of use thresholds
           */
          timeZone?: ("LOCAL" | "AEST") | null;
          /**
           * Flag indicating whether prices are fixed or variable
           */
          isFixed: boolean;
          /**
           * Free text description of price variation policy and conditions for the contract.  Mandatory if isFixed is true
           */
          variation?: string | null;
          /**
           * Free text field that describes what will occur on or prior to expiry of the fixed contract term or benefit period
           */
          onExpiryDescription?: string | null;
          /**
           * Payment options for this contract
           */
          paymentOption: ("PAPER_BILL" | "CREDIT_CARD" | "DIRECT_DEBIT" | "BPAY" | "OTHER")[];
          /**
           * Describes intrinsic green power for the plan.  If present then the plan includes a percentage of green power in the base plan. Should not be present for gas contracts
           */
          intrinsicGreenPower?: {
            /**
             * Percentage of green power intrinsically included in the plan
             */
            greenPercentage: string;
            [k: string]: unknown;
          } | null;
          /**
           * Required if pricing model is SINGLE_RATE_CONT_LOAD or TIME_OF_USE_CONT_LOAD or FLEXIBLE_CONT_LOAD
           */
          controlledLoad?: {
            /**
             * A display name for the controlled load tier
             */
            displayName: string;
            /**
             * A description of the controlled load tier
             */
            description?: string | null;
            /**
             * The daily supply charge (exclusive of GST) for this controlled load tier
             */
            dailyCharge: string;
            /**
             * The period for which the controlled load rate applies. Formatted according to [ISO 8601 Durations](https://en.wikipedia.org/wiki/ISO_8601#Durations) (excludes recurrence syntax)
             */
            period: string;
            /**
             * Array of controlled load rates in order of usage volume
             */
            rates: {
              /**
               * Unit price of usage per kWh (exclusive of GST)
               */
              unitPrice: string;
              /**
               * Volume in kWh that this rate applies to.  Only applicable for ‘stepped’ rates where different rates apply for different volumes of usage in a period
               */
              volume?: number | null;
              [k: string]: unknown;
            }[];
            [k: string]: unknown;
          } | null;
          /**
           * Optional list of incentives available for the contract
           */
          incentives?: {
            [k: string]: unknown;
          } | null;
          /**
           * Optional list of discounts available for the contract
           */
          discounts?: {
            [k: string]: unknown;
          } | null;
          /**
           * Optional list of charges applicable to green power
           */
          greenPowerCharges?: {
            [k: string]: unknown;
          } | null;
          /**
           * Eligibility restrictions or requirements
           */
          eligibility?: {
            [k: string]: unknown;
          } | null;
          /**
           * An array of fees applicable to the plan
           */
          fees?: {
            [k: string]: unknown;
          } | null;
          /**
           * Array of feed in tariffs for solar power
           */
          solarFeedInTariff?: {
            [k: string]: unknown;
          } | null;
          /**
           * Array of tariff periods
           */
          tariffPeriod: {
            [k: string]: unknown;
          };
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      /**
       * An array of additional contacts that are authorised to act on this account
       */
      authorisedContacts?: {
        /**
         * For people with single names this field need not be present. The single name should be in the lastName field
         */
        firstName?: string;
        /**
         * For people with single names the single name should be in this field
         */
        lastName: string;
        /**
         * Field is mandatory but array may be empty
         */
        middleNames?: string[];
        /**
         * Also known as title or salutation. The prefix to the name (e.g. Mr, Mrs, Ms, Miss, Sir, etc)
         */
        prefix?: string;
        /**
         * Used for a trailing suffix to the name (e.g. Jr)
         */
        suffix?: string;
        [k: string]: unknown;
      }[];
      [k: string]: unknown;
    }[];
    [k: string]: unknown;
  };
  export interface EnergyAccountDetailResponse {
    data: {
      /**
       * The ID of the account.  To be created in accordance with CDR ID permanence requirements
       */
      accountId: string;
      /**
       * Optional identifier of the account as defined by the data holder.  This must be the value presented on physical statements (if it exists) and must not be used for the value of accountId
       */
      accountNumber?: string | null;
      /**
       * An optional display name for the account if one exists or can be derived.  The content of this field is at the discretion of the data holder
       */
      displayName?: string | null;
      /**
       * The date that the account was created or opened
       */
      creationDate: string;
      [k: string]: unknown;
    } & {
      /**
       * The array of plans containing service points and associated plan details
       */
      plans: {
        /**
         * Optional display name for the plan provided by the customer to help differentiate multiple plans
         */
        nickname?: string | null;
        /**
         * An array of servicePointIds, representing NMIs, that this account is linked to
         */
        servicePointIds: string[];
        planOverview: {
          /**
           * The name of the plan if one exists
           */
          displayName?: string | null;
          /**
           * The start date of the applicability of this plan
           */
          startDate: string;
          /**
           * The end date of the applicability of this plan
           */
          endDate?: string | null;
          [k: string]: unknown;
        };
        /**
         * Detail on the plan applicable to this account
         */
        planDetail: {
          /**
           * The fuel types covered by the plan
           */
          fuelType: "ELECTRICITY" | "GAS" | "DUAL";
          /**
           * Flag that indicates that the plan is contingent on the customer taking up an alternate fuel plan from the same retailer (for instance, if the fuelType is ELECTRICITY then a GAS plan from the same retailer must be taken up). Has no meaning if the plan has a fuelType of DUAL. If absent the value is assumed to be false
           */
          isContingentPlan?: boolean;
          /**
           * Charges for metering included in the plan
           */
          meteringCharges?: {
            /**
             * Display name of the charge
             */
            displayName: string;
            /**
             * Description of the charge
             */
            description?: string | null;
            /**
             * Minimum value of the charge if the charge is a range or the absolute value of the charge if no range is specified
             */
            minimumValue: string;
            /**
             * The upper limit of the charge if the charge could occur in a range
             */
            maximumValue?: string | null;
            /**
             * The charges that occur on a schedule indicates the frequency. Formatted according to [ISO 8601 Durations](https://en.wikipedia.org/wiki/ISO_8601#Durations) (excludes recurrence syntax)
             */
            period?: string | null;
            [k: string]: unknown;
          }[];
          /**
           * The details of the terms for the supply of electricity under this plan.  Is mandatory if fuelType is set to GAS or DUAL
           */
          gasContract?: {
            /**
             * Free text field containing additional information of the fees for this contract
             */
            additionalFeeInformation?: string | null;
            /**
             * The pricing model for the contract.  Contracts for gas must use SINGLE_RATE.  Note that the detail for the enumeration values are:<ul><li>**SINGLE_RATE** - all energy usage is charged at a single unit rate no matter when it is consumed. Multiple unit rates may exist that correspond to varying volumes of usage i.e. a ‘block’ or ‘step’ tariff (first 50kWh @ X cents, next 50kWh at Y cents etc.</li><li>**SINGLE_RATE_CONT_LOAD** - as above, but with an additional, separate unit rate charged for all energy usage from a controlled load i.e. separately metered appliance like hot water service, pool pump etc.</li><li>**TIME_OF_USE** - energy usage is charged at unit rates that vary dependent on time of day and day of week that the energy is consumed</li><li>**TIME_OF_USE_CONT_LOAD** - as above, but with an additional, separate unit rate charged for all energy usage from a controlled load i.e. separately metered appliance like hot water service, pool pump etc.</li><li>**FLEXIBLE** - energy usage is charged at unit rates that vary based on external factors</li><li>**FLEXIBLE_CONT_LOAD** - as above, but with an additional, separate unit rate charged for all energy usage from a controlled load i.e. separately metered appliance like hot water service, pool pump etc.</li><li>**QUOTA** - all energy usage is charged at a single fixed rate, up to a specified usage quota/allowance. All excess usage beyond the allowance is then charged at a single unit rate (may not be the best way to explain it but it is essentially a ‘subscription’ or telco style product i.e. $50/month for up to 150kWh included usage</li></ul>
             */
            pricingModel:
              | "SINGLE_RATE"
              | "SINGLE_RATE_CONT_LOAD"
              | "TIME_OF_USE"
              | "TIME_OF_USE_CONT_LOAD"
              | "FLEXIBLE"
              | "FLEXIBLE_CONT_LOAD"
              | "QUOTA";
            /**
             * Required if pricingModel is set to TIME_OF_USE.  Defines the time zone to use for calculation of the time of use thresholds
             */
            timeZone?: ("LOCAL" | "AEST") | null;
            /**
             * Flag indicating whether prices are fixed or variable
             */
            isFixed: boolean;
            /**
             * Free text description of price variation policy and conditions for the contract.  Mandatory if isFixed is true
             */
            variation?: string | null;
            /**
             * Free text field that describes what will occur on or prior to expiry of the fixed contract term or benefit period
             */
            onExpiryDescription?: string | null;
            /**
             * Payment options for this contract
             */
            paymentOption: ("PAPER_BILL" | "CREDIT_CARD" | "DIRECT_DEBIT" | "BPAY" | "OTHER")[];
            /**
             * Describes intrinsic green power for the plan.  If present then the plan includes a percentage of green power in the base plan. Should not be present for gas contracts
             */
            intrinsicGreenPower?: {
              /**
               * Percentage of green power intrinsically included in the plan
               */
              greenPercentage: string;
              [k: string]: unknown;
            } | null;
            /**
             * Required if pricing model is SINGLE_RATE_CONT_LOAD or TIME_OF_USE_CONT_LOAD or FLEXIBLE_CONT_LOAD
             */
            controlledLoad?: {
              /**
               * A display name for the controlled load tier
               */
              displayName: string;
              /**
               * A description of the controlled load tier
               */
              description?: string | null;
              /**
               * The daily supply charge (exclusive of GST) for this controlled load tier
               */
              dailyCharge: string;
              /**
               * The period for which the controlled load rate applies. Formatted according to [ISO 8601 Durations](https://en.wikipedia.org/wiki/ISO_8601#Durations) (excludes recurrence syntax)
               */
              period: string;
              /**
               * Array of controlled load rates in order of usage volume
               */
              rates: {
                /**
                 * Unit price of usage per kWh (exclusive of GST)
                 */
                unitPrice: string;
                /**
                 * Volume in kWh that this rate applies to.  Only applicable for ‘stepped’ rates where different rates apply for different volumes of usage in a period
                 */
                volume?: number | null;
                [k: string]: unknown;
              }[];
              [k: string]: unknown;
            } | null;
            /**
             * Optional list of incentives available for the contract
             */
            incentives?: {
              [k: string]: unknown;
            } | null;
            /**
             * Optional list of discounts available for the contract
             */
            discounts?: {
              [k: string]: unknown;
            } | null;
            /**
             * Optional list of charges applicable to green power
             */
            greenPowerCharges?: {
              [k: string]: unknown;
            } | null;
            /**
             * Eligibility restrictions or requirements
             */
            eligibility?: {
              [k: string]: unknown;
            } | null;
            /**
             * An array of fees applicable to the plan
             */
            fees?: {
              [k: string]: unknown;
            } | null;
            /**
             * Array of feed in tariffs for solar power
             */
            solarFeedInTariff?: {
              [k: string]: unknown;
            } | null;
            /**
             * Array of tariff periods
             */
            tariffPeriod: {
              [k: string]: unknown;
            };
            [k: string]: unknown;
          };
          /**
           * The details of the terms for the supply of electricity under this plan.  Is mandatory if fuelType is set to ELECTRICITY or DUAL
           */
          electricityContract?: {
            /**
             * Free text field containing additional information of the fees for this contract
             */
            additionalFeeInformation?: string | null;
            /**
             * The pricing model for the contract.  Contracts for gas must use SINGLE_RATE.  Note that the detail for the enumeration values are:<ul><li>**SINGLE_RATE** - all energy usage is charged at a single unit rate no matter when it is consumed. Multiple unit rates may exist that correspond to varying volumes of usage i.e. a ‘block’ or ‘step’ tariff (first 50kWh @ X cents, next 50kWh at Y cents etc.</li><li>**SINGLE_RATE_CONT_LOAD** - as above, but with an additional, separate unit rate charged for all energy usage from a controlled load i.e. separately metered appliance like hot water service, pool pump etc.</li><li>**TIME_OF_USE** - energy usage is charged at unit rates that vary dependent on time of day and day of week that the energy is consumed</li><li>**TIME_OF_USE_CONT_LOAD** - as above, but with an additional, separate unit rate charged for all energy usage from a controlled load i.e. separately metered appliance like hot water service, pool pump etc.</li><li>**FLEXIBLE** - energy usage is charged at unit rates that vary based on external factors</li><li>**FLEXIBLE_CONT_LOAD** - as above, but with an additional, separate unit rate charged for all energy usage from a controlled load i.e. separately metered appliance like hot water service, pool pump etc.</li><li>**QUOTA** - all energy usage is charged at a single fixed rate, up to a specified usage quota/allowance. All excess usage beyond the allowance is then charged at a single unit rate (may not be the best way to explain it but it is essentially a ‘subscription’ or telco style product i.e. $50/month for up to 150kWh included usage</li></ul>
             */
            pricingModel:
              | "SINGLE_RATE"
              | "SINGLE_RATE_CONT_LOAD"
              | "TIME_OF_USE"
              | "TIME_OF_USE_CONT_LOAD"
              | "FLEXIBLE"
              | "FLEXIBLE_CONT_LOAD"
              | "QUOTA";
            /**
             * Required if pricingModel is set to TIME_OF_USE.  Defines the time zone to use for calculation of the time of use thresholds
             */
            timeZone?: ("LOCAL" | "AEST") | null;
            /**
             * Flag indicating whether prices are fixed or variable
             */
            isFixed: boolean;
            /**
             * Free text description of price variation policy and conditions for the contract.  Mandatory if isFixed is true
             */
            variation?: string | null;
            /**
             * Free text field that describes what will occur on or prior to expiry of the fixed contract term or benefit period
             */
            onExpiryDescription?: string | null;
            /**
             * Payment options for this contract
             */
            paymentOption: ("PAPER_BILL" | "CREDIT_CARD" | "DIRECT_DEBIT" | "BPAY" | "OTHER")[];
            /**
             * Describes intrinsic green power for the plan.  If present then the plan includes a percentage of green power in the base plan. Should not be present for gas contracts
             */
            intrinsicGreenPower?: {
              /**
               * Percentage of green power intrinsically included in the plan
               */
              greenPercentage: string;
              [k: string]: unknown;
            } | null;
            /**
             * Required if pricing model is SINGLE_RATE_CONT_LOAD or TIME_OF_USE_CONT_LOAD or FLEXIBLE_CONT_LOAD
             */
            controlledLoad?: {
              /**
               * A display name for the controlled load tier
               */
              displayName: string;
              /**
               * A description of the controlled load tier
               */
              description?: string | null;
              /**
               * The daily supply charge (exclusive of GST) for this controlled load tier
               */
              dailyCharge: string;
              /**
               * The period for which the controlled load rate applies. Formatted according to [ISO 8601 Durations](https://en.wikipedia.org/wiki/ISO_8601#Durations) (excludes recurrence syntax)
               */
              period: string;
              /**
               * Array of controlled load rates in order of usage volume
               */
              rates: {
                /**
                 * Unit price of usage per kWh (exclusive of GST)
                 */
                unitPrice: string;
                /**
                 * Volume in kWh that this rate applies to.  Only applicable for ‘stepped’ rates where different rates apply for different volumes of usage in a period
                 */
                volume?: number | null;
                [k: string]: unknown;
              }[];
              [k: string]: unknown;
            } | null;
            /**
             * Optional list of incentives available for the contract
             */
            incentives?: {
              [k: string]: unknown;
            } | null;
            /**
             * Optional list of discounts available for the contract
             */
            discounts?: {
              [k: string]: unknown;
            } | null;
            /**
             * Optional list of charges applicable to green power
             */
            greenPowerCharges?: {
              [k: string]: unknown;
            } | null;
            /**
             * Eligibility restrictions or requirements
             */
            eligibility?: {
              [k: string]: unknown;
            } | null;
            /**
             * An array of fees applicable to the plan
             */
            fees?: {
              [k: string]: unknown;
            } | null;
            /**
             * Array of feed in tariffs for solar power
             */
            solarFeedInTariff?: {
              [k: string]: unknown;
            } | null;
            /**
             * Array of tariff periods
             */
            tariffPeriod: {
              [k: string]: unknown;
            };
            [k: string]: unknown;
          };
          [k: string]: unknown;
        };
        /**
         * An array of additional contacts that are authorised to act on this account
         */
        authorisedContacts?: {
          /**
           * For people with single names this field need not be present. The single name should be in the lastName field
           */
          firstName?: string;
          /**
           * For people with single names the single name should be in this field
           */
          lastName: string;
          /**
           * Field is mandatory but array may be empty
           */
          middleNames?: string[];
          /**
           * Also known as title or salutation. The prefix to the name (e.g. Mr, Mrs, Ms, Miss, Sir, etc)
           */
          prefix?: string;
          /**
           * Used for a trailing suffix to the name (e.g. Jr)
           */
          suffix?: string;
          [k: string]: unknown;
        }[];
        [k: string]: unknown;
      }[];
      [k: string]: unknown;
    };
    links: {
      /**
       * Fully qualified link that generated the current response document
       */
      self: string;
      [k: string]: unknown;
    };
    meta: {
      [k: string]: unknown;
    };
    [k: string]: unknown;
  }
  export interface EnergyAccountListResponse {
    data: {
      /**
       * Array of accounts
       */
      accounts: ({
        /**
         * The ID of the account.  To be created in accordance with CDR ID permanence requirements
         */
        accountId: string;
        /**
         * Optional identifier of the account as defined by the data holder.  This must be the value presented on physical statements (if it exists) and must not be used for the value of accountId
         */
        accountNumber?: string | null;
        /**
         * An optional display name for the account if one exists or can be derived.  The content of this field is at the discretion of the data holder
         */
        displayName?: string | null;
        /**
         * The date that the account was created or opened
         */
        creationDate: string;
        [k: string]: unknown;
      } & {
        /**
         * The array of plans containing service points and associated plan details
         */
        plans: {
          /**
           * Optional display name for the plan provided by the customer to help differentiate multiple plans
           */
          nickname?: string | null;
          /**
           * An array of servicePointIds, representing NMIs, that this plan is linked to.  If there are no service points allocated to this plan then an empty array would be expected
           */
          servicePointIds: string[];
          planOverview: {
            /**
             * The name of the plan if one exists
             */
            displayName?: string | null;
            /**
             * The start date of the applicability of this plan
             */
            startDate: string;
            /**
             * The end date of the applicability of this plan
             */
            endDate?: string | null;
            [k: string]: unknown;
          };
          [k: string]: unknown;
        }[];
        [k: string]: unknown;
      })[];
      [k: string]: unknown;
    };
    links: {
      /**
       * Fully qualified link that generated the current response document
       */
      self: string;
      /**
       * URI to the first page of this set. Mandatory if this response is not the first page
       */
      first?: string | null;
      /**
       * URI to the previous page of this set. Mandatory if this response is not the first page
       */
      prev?: string | null;
      /**
       * URI to the next page of this set. Mandatory if this response is not the last page
       */
      next?: string | null;
      /**
       * URI to the last page of this set. Mandatory if this response is not the last page
       */
      last?: string | null;
      [k: string]: unknown;
    };
    meta: {
      /**
       * The total number of records in the full set. See [pagination](#pagination).
       */
      totalRecords: number;
      /**
       * The total number of pages in the full set. See [pagination](#pagination).
       */
      totalPages: number;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  }
  export interface EnergyBalanceListResponse {
    data: {
      /**
       * Array of account balances
       */
      balances: {
        /**
         * The ID of the account
         */
        accountId: string;
        /**
         * The current balance of the account.  A positive value indicates that amount is owing to be paid.  A negative value indicates that the account is in credit
         */
        balance: string;
        [k: string]: unknown;
      }[];
      [k: string]: unknown;
    };
    links: {
      /**
       * Fully qualified link that generated the current response document
       */
      self: string;
      /**
       * URI to the first page of this set. Mandatory if this response is not the first page
       */
      first?: string | null;
      /**
       * URI to the previous page of this set. Mandatory if this response is not the first page
       */
      prev?: string | null;
      /**
       * URI to the next page of this set. Mandatory if this response is not the last page
       */
      next?: string | null;
      /**
       * URI to the last page of this set. Mandatory if this response is not the last page
       */
      last?: string | null;
      [k: string]: unknown;
    };
    meta: {
      /**
       * The total number of records in the full set. See [pagination](#pagination).
       */
      totalRecords: number;
      /**
       * The total number of pages in the full set. See [pagination](#pagination).
       */
      totalPages: number;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  }
  export interface EnergyBalanceResponse {
    data: {
      /**
       * The current balance of the account.  A positive value indicates that amount is owing to be paid.  A negative value indicates that the account is in credit
       */
      balance: string;
      [k: string]: unknown;
    };
    links: {
      /**
       * Fully qualified link that generated the current response document
       */
      self: string;
      [k: string]: unknown;
    };
    meta: {
      [k: string]: unknown;
    };
    [k: string]: unknown;
  }
  export interface EnergyBillingDemandTransaction {
    /**
     * The ID of the service point to which this transaction applies if any
     */
    servicePointId?: string | null;
    /**
     * The number of the invoice in which this transaction is included if it has been issued
     */
    invoiceNumber?: string | null;
    /**
     * The time of use type that the transaction applies to
     */
    timeOfUseType:
      | "PEAK"
      | "OFF_PEAK"
      | "OFF_PEAK_DEMAND_CHARGE"
      | "SHOULDER"
      | "SHOULDER1"
      | "SHOULDER2"
      | "CONTROLLED_LOAD"
      | "SOLAR"
      | "AGGREGATE";
    /**
     * Optional description of the transaction that can be used for display purposes
     */
    description?: string | null;
    /**
     * Flag indicating if the usage is estimated or actual.  True indicates estimate.  False or absent indicates actual
     */
    isEstimate?: boolean | null;
    /**
     * Date and time when the demand period starts
     */
    startDate: string;
    /**
     * Date and time when the demand period ends
     */
    endDate: string;
    /**
     * The rate for the demand charge in kVA.  A negative value indicates power generated
     */
    rate: number;
    /**
     * The amount charged or credited for this transaction prior to any adjustments being applied.  A negative value indicates a credit
     */
    amount: string;
    /**
     * Additional calculation factors that inform the transaction
     */
    calculationFactors?:
      | {
          /**
           * The value of the calculation factor
           */
          value: number;
          /**
           * The type of the calculation factor
           */
          type: "DLF" | "MLF";
          [k: string]: unknown;
        }[]
      | null;
    /**
     * Optional array of adjustments arising for this transaction
     */
    adjustments?:
      | {
          /**
           * The amount of the adjustment
           */
          amount: string;
          /**
           * A free text description of the adjustment
           */
          description: string;
          [k: string]: unknown;
        }[]
      | null;
    [k: string]: unknown;
  }
  export interface EnergyBillingListResponse {
    data: {
      /**
       * Array of transactions sorted by date and time in descending order
       */
      transactions: {
        /**
         * The ID of the account for which transaction applies
         */
        accountId: string;
        /**
         * The date and time that the transaction occurred
         */
        executionDateTime: string;
        /**
         * The GST incurred in the transaction.  Should not be included for credits or payments.  If absent zero is assumed
         */
        gst?: string | null;
        /**
         * Indicator of the type of transaction object present in this record
         */
        transactionUType: "usage" | "demand" | "onceOff" | "otherCharges" | "payment";
        /**
         * Represents a usage charge or generation credit.  Mandatory if transactionUType is equal to usage
         */
        usage?: {
          /**
           * The ID of the service point to which this transaction applies if any
           */
          servicePointId?: string | null;
          /**
           * The number of the invoice in which this transaction is included if it has been issued
           */
          invoiceNumber?: string | null;
          /**
           * The time of use type that the transaction applies to
           */
          timeOfUseType:
            | "PEAK"
            | "OFF_PEAK"
            | "OFF_PEAK_DEMAND_CHARGE"
            | "SHOULDER"
            | "SHOULDER1"
            | "SHOULDER2"
            | "CONTROLLED_LOAD"
            | "SOLAR"
            | "AGGREGATE";
          /**
           * Optional description of the transaction that can be used for display purposes
           */
          description?: string | null;
          /**
           * Flag indicating if the usage is estimated or actual.  True indicates estimate.  False or absent indicates actual
           */
          isEstimate?: boolean | null;
          /**
           * Date and time when the usage period starts
           */
          startDate: string;
          /**
           * Date and time when the usage period ends
           */
          endDate: string;
          /**
           * The measurement unit of rate. Assumed to be KWH if absent
           */
          measureUnit?: ("KWH" | "KVA" | "KVAR" | "KVARH" | "KW" | "DAYS" | "METER" | "MONTH") | null;
          /**
           * The usage for the period in measure unit.  A negative value indicates power generated
           */
          usage: number;
          /**
           * The amount charged or credited for this transaction prior to any adjustments being applied.  A negative value indicates a credit
           */
          amount: string;
          /**
           * Additional calculation factors that inform the transaction
           */
          calculationFactors?:
            | {
                /**
                 * The value of the calculation factor
                 */
                value: number;
                /**
                 * The type of the calculation factor
                 */
                type: "DLF" | "MLF";
                [k: string]: unknown;
              }[]
            | null;
          /**
           * Optional array of adjustments arising for this transaction
           */
          adjustments?:
            | {
                /**
                 * The amount of the adjustment
                 */
                amount: string;
                /**
                 * A free text description of the adjustment
                 */
                description: string;
                [k: string]: unknown;
              }[]
            | null;
          [k: string]: unknown;
        } | null;
        /**
         * Represents a demand charge or generation credit.  Mandatory if transactionUType is equal to demand
         */
        demand?: {
          /**
           * The ID of the service point to which this transaction applies if any
           */
          servicePointId?: string | null;
          /**
           * The number of the invoice in which this transaction is included if it has been issued
           */
          invoiceNumber?: string | null;
          /**
           * The time of use type that the transaction applies to
           */
          timeOfUseType:
            | "PEAK"
            | "OFF_PEAK"
            | "OFF_PEAK_DEMAND_CHARGE"
            | "SHOULDER"
            | "SHOULDER1"
            | "SHOULDER2"
            | "CONTROLLED_LOAD"
            | "SOLAR"
            | "AGGREGATE";
          /**
           * Optional description of the transaction that can be used for display purposes
           */
          description?: string | null;
          /**
           * Flag indicating if the usage is estimated or actual.  True indicates estimate.  False or absent indicates actual
           */
          isEstimate?: boolean | null;
          /**
           * Date and time when the demand period starts
           */
          startDate: string;
          /**
           * Date and time when the demand period ends
           */
          endDate: string;
          /**
           * The rate for the demand charge in kVA.  A negative value indicates power generated
           */
          rate: number;
          /**
           * The amount charged or credited for this transaction prior to any adjustments being applied.  A negative value indicates a credit
           */
          amount: string;
          /**
           * Additional calculation factors that inform the transaction
           */
          calculationFactors?:
            | {
                /**
                 * The value of the calculation factor
                 */
                value: number;
                /**
                 * The type of the calculation factor
                 */
                type: "DLF" | "MLF";
                [k: string]: unknown;
              }[]
            | null;
          /**
           * Optional array of adjustments arising for this transaction
           */
          adjustments?:
            | {
                /**
                 * The amount of the adjustment
                 */
                amount: string;
                /**
                 * A free text description of the adjustment
                 */
                description: string;
                [k: string]: unknown;
              }[]
            | null;
          [k: string]: unknown;
        } | null;
        /**
         * Represents a once off charge or credit.  Mandatory if transactionUType is equal to onceOff
         */
        onceOff?: {
          /**
           * The ID of the service point to which this transaction applies if any
           */
          servicePointId?: string | null;
          /**
           * The number of the invoice in which this transaction is included if it has been issued
           */
          invoiceNumber?: string | null;
          /**
           * The amount of the charge or credit.  A positive value indicates a charge and a negative value indicates a credit
           */
          amount: string;
          /**
           * A free text description of the item
           */
          description: string;
          [k: string]: unknown;
        } | null;
        /**
         * Represents charge other than usage and once off.  Mandatory if transactionUType is equal to otherCharge
         */
        otherCharges?: {
          /**
           * The ID of the service point to which this transaction applies if any
           */
          servicePointId?: string;
          /**
           * The number of the invoice in which this transaction is included if it has been issued
           */
          invoiceNumber?: string | null;
          /**
           * Optional start date for the application of the charge
           */
          startDate?: string;
          /**
           * Optional end date for the application of the charge
           */
          endDate?: string;
          /**
           * Type of charge. Assumed to be other if absent
           */
          type?: "ENVIRONMENTAL" | "REGULATED" | "NETWORK" | "METERING" | "RETAIL_SERVICE" | "RCTI" | "OTHER";
          /**
           * The amount of the charge
           */
          amount: string;
          /**
           * A free text description of the item
           */
          description: string;
          [k: string]: unknown;
        } | null;
        /**
         * Represents a payment to the account.  Mandatory if transactionUType is equal to payment
         */
        payment?: {
          /**
           * The amount paid
           */
          amount: string;
          /**
           * The method of payment
           */
          method: "DIRECT_DEBIT" | "CARD" | "TRANSFER" | "BPAY" | "CASH" | "CHEQUE" | "OTHER";
          [k: string]: unknown;
        } | null;
        [k: string]: unknown;
      }[];
      [k: string]: unknown;
    };
    links: {
      /**
       * Fully qualified link that generated the current response document
       */
      self: string;
      /**
       * URI to the first page of this set. Mandatory if this response is not the first page
       */
      first?: string | null;
      /**
       * URI to the previous page of this set. Mandatory if this response is not the first page
       */
      prev?: string | null;
      /**
       * URI to the next page of this set. Mandatory if this response is not the last page
       */
      next?: string | null;
      /**
       * URI to the last page of this set. Mandatory if this response is not the last page
       */
      last?: string | null;
      [k: string]: unknown;
    };
    meta: {
      /**
       * The total number of records in the full set. See [pagination](#pagination).
       */
      totalRecords: number;
      /**
       * The total number of pages in the full set. See [pagination](#pagination).
       */
      totalPages: number;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  }
  export interface EnergyBillingOnceOffTransaction {
    /**
     * The ID of the service point to which this transaction applies if any
     */
    servicePointId?: string | null;
    /**
     * The number of the invoice in which this transaction is included if it has been issued
     */
    invoiceNumber?: string | null;
    /**
     * The amount of the charge or credit.  A positive value indicates a charge and a negative value indicates a credit
     */
    amount: string;
    /**
     * A free text description of the item
     */
    description: string;
    [k: string]: unknown;
  }
  export interface EnergyBillingOtherTransaction {
    /**
     * The ID of the service point to which this transaction applies if any
     */
    servicePointId?: string;
    /**
     * The number of the invoice in which this transaction is included if it has been issued
     */
    invoiceNumber?: string | null;
    /**
     * Optional start date for the application of the charge
     */
    startDate?: string;
    /**
     * Optional end date for the application of the charge
     */
    endDate?: string;
    /**
     * Type of charge. Assumed to be other if absent
     */
    type?: "ENVIRONMENTAL" | "REGULATED" | "NETWORK" | "METERING" | "RETAIL_SERVICE" | "RCTI" | "OTHER";
    /**
     * The amount of the charge
     */
    amount: string;
    /**
     * A free text description of the item
     */
    description: string;
    [k: string]: unknown;
  }
  export interface EnergyBillingPaymentTransaction {
    /**
     * The amount paid
     */
    amount: string;
    /**
     * The method of payment
     */
    method: "DIRECT_DEBIT" | "CARD" | "TRANSFER" | "BPAY" | "CASH" | "CHEQUE" | "OTHER";
    [k: string]: unknown;
  }
  export interface EnergyBillingTransaction {
    /**
     * The ID of the account for which transaction applies
     */
    accountId: string;
    /**
     * The date and time that the transaction occurred
     */
    executionDateTime: string;
    /**
     * The GST incurred in the transaction.  Should not be included for credits or payments.  If absent zero is assumed
     */
    gst?: string | null;
    /**
     * Indicator of the type of transaction object present in this record
     */
    transactionUType: "usage" | "demand" | "onceOff" | "otherCharges" | "payment";
    /**
     * Represents a usage charge or generation credit.  Mandatory if transactionUType is equal to usage
     */
    usage?: {
      /**
       * The ID of the service point to which this transaction applies if any
       */
      servicePointId?: string | null;
      /**
       * The number of the invoice in which this transaction is included if it has been issued
       */
      invoiceNumber?: string | null;
      /**
       * The time of use type that the transaction applies to
       */
      timeOfUseType:
        | "PEAK"
        | "OFF_PEAK"
        | "OFF_PEAK_DEMAND_CHARGE"
        | "SHOULDER"
        | "SHOULDER1"
        | "SHOULDER2"
        | "CONTROLLED_LOAD"
        | "SOLAR"
        | "AGGREGATE";
      /**
       * Optional description of the transaction that can be used for display purposes
       */
      description?: string | null;
      /**
       * Flag indicating if the usage is estimated or actual.  True indicates estimate.  False or absent indicates actual
       */
      isEstimate?: boolean | null;
      /**
       * Date and time when the usage period starts
       */
      startDate: string;
      /**
       * Date and time when the usage period ends
       */
      endDate: string;
      /**
       * The measurement unit of rate. Assumed to be KWH if absent
       */
      measureUnit?: ("KWH" | "KVA" | "KVAR" | "KVARH" | "KW" | "DAYS" | "METER" | "MONTH") | null;
      /**
       * The usage for the period in measure unit.  A negative value indicates power generated
       */
      usage: number;
      /**
       * The amount charged or credited for this transaction prior to any adjustments being applied.  A negative value indicates a credit
       */
      amount: string;
      /**
       * Additional calculation factors that inform the transaction
       */
      calculationFactors?:
        | {
            /**
             * The value of the calculation factor
             */
            value: number;
            /**
             * The type of the calculation factor
             */
            type: "DLF" | "MLF";
            [k: string]: unknown;
          }[]
        | null;
      /**
       * Optional array of adjustments arising for this transaction
       */
      adjustments?:
        | {
            /**
             * The amount of the adjustment
             */
            amount: string;
            /**
             * A free text description of the adjustment
             */
            description: string;
            [k: string]: unknown;
          }[]
        | null;
      [k: string]: unknown;
    } | null;
    /**
     * Represents a demand charge or generation credit.  Mandatory if transactionUType is equal to demand
     */
    demand?: {
      /**
       * The ID of the service point to which this transaction applies if any
       */
      servicePointId?: string | null;
      /**
       * The number of the invoice in which this transaction is included if it has been issued
       */
      invoiceNumber?: string | null;
      /**
       * The time of use type that the transaction applies to
       */
      timeOfUseType:
        | "PEAK"
        | "OFF_PEAK"
        | "OFF_PEAK_DEMAND_CHARGE"
        | "SHOULDER"
        | "SHOULDER1"
        | "SHOULDER2"
        | "CONTROLLED_LOAD"
        | "SOLAR"
        | "AGGREGATE";
      /**
       * Optional description of the transaction that can be used for display purposes
       */
      description?: string | null;
      /**
       * Flag indicating if the usage is estimated or actual.  True indicates estimate.  False or absent indicates actual
       */
      isEstimate?: boolean | null;
      /**
       * Date and time when the demand period starts
       */
      startDate: string;
      /**
       * Date and time when the demand period ends
       */
      endDate: string;
      /**
       * The rate for the demand charge in kVA.  A negative value indicates power generated
       */
      rate: number;
      /**
       * The amount charged or credited for this transaction prior to any adjustments being applied.  A negative value indicates a credit
       */
      amount: string;
      /**
       * Additional calculation factors that inform the transaction
       */
      calculationFactors?:
        | {
            /**
             * The value of the calculation factor
             */
            value: number;
            /**
             * The type of the calculation factor
             */
            type: "DLF" | "MLF";
            [k: string]: unknown;
          }[]
        | null;
      /**
       * Optional array of adjustments arising for this transaction
       */
      adjustments?:
        | {
            /**
             * The amount of the adjustment
             */
            amount: string;
            /**
             * A free text description of the adjustment
             */
            description: string;
            [k: string]: unknown;
          }[]
        | null;
      [k: string]: unknown;
    } | null;
    /**
     * Represents a once off charge or credit.  Mandatory if transactionUType is equal to onceOff
     */
    onceOff?: {
      /**
       * The ID of the service point to which this transaction applies if any
       */
      servicePointId?: string | null;
      /**
       * The number of the invoice in which this transaction is included if it has been issued
       */
      invoiceNumber?: string | null;
      /**
       * The amount of the charge or credit.  A positive value indicates a charge and a negative value indicates a credit
       */
      amount: string;
      /**
       * A free text description of the item
       */
      description: string;
      [k: string]: unknown;
    } | null;
    /**
     * Represents charge other than usage and once off.  Mandatory if transactionUType is equal to otherCharge
     */
    otherCharges?: {
      /**
       * The ID of the service point to which this transaction applies if any
       */
      servicePointId?: string;
      /**
       * The number of the invoice in which this transaction is included if it has been issued
       */
      invoiceNumber?: string | null;
      /**
       * Optional start date for the application of the charge
       */
      startDate?: string;
      /**
       * Optional end date for the application of the charge
       */
      endDate?: string;
      /**
       * Type of charge. Assumed to be other if absent
       */
      type?: "ENVIRONMENTAL" | "REGULATED" | "NETWORK" | "METERING" | "RETAIL_SERVICE" | "RCTI" | "OTHER";
      /**
       * The amount of the charge
       */
      amount: string;
      /**
       * A free text description of the item
       */
      description: string;
      [k: string]: unknown;
    } | null;
    /**
     * Represents a payment to the account.  Mandatory if transactionUType is equal to payment
     */
    payment?: {
      /**
       * The amount paid
       */
      amount: string;
      /**
       * The method of payment
       */
      method: "DIRECT_DEBIT" | "CARD" | "TRANSFER" | "BPAY" | "CASH" | "CHEQUE" | "OTHER";
      [k: string]: unknown;
    } | null;
    [k: string]: unknown;
  }
  export interface EnergyBillingUsageTransaction {
    /**
     * The ID of the service point to which this transaction applies if any
     */
    servicePointId?: string | null;
    /**
     * The number of the invoice in which this transaction is included if it has been issued
     */
    invoiceNumber?: string | null;
    /**
     * The time of use type that the transaction applies to
     */
    timeOfUseType:
      | "PEAK"
      | "OFF_PEAK"
      | "OFF_PEAK_DEMAND_CHARGE"
      | "SHOULDER"
      | "SHOULDER1"
      | "SHOULDER2"
      | "CONTROLLED_LOAD"
      | "SOLAR"
      | "AGGREGATE";
    /**
     * Optional description of the transaction that can be used for display purposes
     */
    description?: string | null;
    /**
     * Flag indicating if the usage is estimated or actual.  True indicates estimate.  False or absent indicates actual
     */
    isEstimate?: boolean | null;
    /**
     * Date and time when the usage period starts
     */
    startDate: string;
    /**
     * Date and time when the usage period ends
     */
    endDate: string;
    /**
     * The measurement unit of rate. Assumed to be KWH if absent
     */
    measureUnit?: ("KWH" | "KVA" | "KVAR" | "KVARH" | "KW" | "DAYS" | "METER" | "MONTH") | null;
    /**
     * The usage for the period in measure unit.  A negative value indicates power generated
     */
    usage: number;
    /**
     * The amount charged or credited for this transaction prior to any adjustments being applied.  A negative value indicates a credit
     */
    amount: string;
    /**
     * Additional calculation factors that inform the transaction
     */
    calculationFactors?:
      | {
          /**
           * The value of the calculation factor
           */
          value: number;
          /**
           * The type of the calculation factor
           */
          type: "DLF" | "MLF";
          [k: string]: unknown;
        }[]
      | null;
    /**
     * Optional array of adjustments arising for this transaction
     */
    adjustments?:
      | {
          /**
           * The amount of the adjustment
           */
          amount: string;
          /**
           * A free text description of the adjustment
           */
          description: string;
          [k: string]: unknown;
        }[]
      | null;
    [k: string]: unknown;
  }
  export interface EnergyConcession {
    /**
     * The display name of the concession
     */
    displayName: string;
    /**
     * Display text providing more information on the concession
     */
    additionalInfo?: string | null;
    /**
     * Optional link to additional information regarding the concession
     */
    additionalInfoUri?: string | null;
    /**
     * Optional start date for the application of the concession
     */
    startDate?: string | null;
    /**
     * Optional end date for the application of the concession
     */
    endDate?: string | null;
    /**
     * Daily discount value due to the concession.  At least one dailyDiscount, monthlyDiscount, yearlyDiscount and percentageDiscount must be provided
     */
    dailyDiscount?: string | null;
    /**
     * Monthly discount value due to the concession.  At least one dailyDiscount, monthlyDiscount, yearlyDiscount and percentageDiscount must be provided
     */
    monthlyDiscount?: string | null;
    /**
     * Annual discount value due to the concession.  At least one dailyDiscount, monthlyDiscount, yearlyDiscount and percentageDiscount must be provided
     */
    yearlyDiscount?: string | null;
    /**
     * Percentage of each invoice to be discounted due to the concession.  At least one dailyDiscount, monthlyDiscount, yearlyDiscount and percentageDiscount must be provided
     */
    percentageDiscount?: string | null;
    [k: string]: unknown;
  }
  export interface EnergyConcessionsResponse {
    data: {
      /**
       * Array may be empty if no concessions exist
       */
      concessions: {
        /**
         * The display name of the concession
         */
        displayName: string;
        /**
         * Display text providing more information on the concession
         */
        additionalInfo?: string | null;
        /**
         * Optional link to additional information regarding the concession
         */
        additionalInfoUri?: string | null;
        /**
         * Optional start date for the application of the concession
         */
        startDate?: string | null;
        /**
         * Optional end date for the application of the concession
         */
        endDate?: string | null;
        /**
         * Daily discount value due to the concession.  At least one dailyDiscount, monthlyDiscount, yearlyDiscount and percentageDiscount must be provided
         */
        dailyDiscount?: string | null;
        /**
         * Monthly discount value due to the concession.  At least one dailyDiscount, monthlyDiscount, yearlyDiscount and percentageDiscount must be provided
         */
        monthlyDiscount?: string | null;
        /**
         * Annual discount value due to the concession.  At least one dailyDiscount, monthlyDiscount, yearlyDiscount and percentageDiscount must be provided
         */
        yearlyDiscount?: string | null;
        /**
         * Percentage of each invoice to be discounted due to the concession.  At least one dailyDiscount, monthlyDiscount, yearlyDiscount and percentageDiscount must be provided
         */
        percentageDiscount?: string | null;
        [k: string]: unknown;
      }[];
      [k: string]: unknown;
    };
    links: {
      /**
       * Fully qualified link that generated the current response document
       */
      self: string;
      [k: string]: unknown;
    };
    meta: {
      [k: string]: unknown;
    };
    [k: string]: unknown;
  }

  export interface EnergyDerDetailResponse {
    data: {
      /**
       * Tokenised ID of the service point to be used for referring to the service point in the CDR API suite.  To be created in accordance with CDR ID permanence requirements
       */
      servicePointId: string;
      /**
       * Approved small generating unit capacity as agreed with NSP in the connection agreement, expressed in kVA
       */
      approvedCapacity: number;
      /**
       * The number of phases available for the installation of DER
       */
      availablePhasesCount: number;
      /**
       * The number of phases that DER is connected to
       */
      installedPhasesCount: number;
      /**
       * For identification of small generating units designed with the ability to operate in an islanded mode
       */
      islandableInstallation: string;
      /**
       * For DER installations where NSPs specify the need for additional forms of protection above those inbuilt in an inverter.  If absent then assumed to be false
       */
      hasCentralProtectionControl?: boolean | null;
      /**
       * Required only when the hasCentralProtectionAndControl flag is set to true.  One or more of the object fields will be provided to describe the protection modes in place
       */
      protectionMode?: {
        /**
         * Maximum amount of power (kVA) that may be exported from a connection point to the grid, as monitored by a control / relay function. An absent value indicates no limit
         */
        exportLimitkva?: number | null;
        /**
         * Protective function limit in Hz.
         */
        underFrequencyProtection?: number | null;
        /**
         * Trip delay time in seconds.
         */
        underFrequencyProtectionDelay?: number | null;
        /**
         * Protective function limit in Hz.
         */
        overFrequencyProtection?: number | null;
        /**
         * Trip delay time in seconds.
         */
        overFrequencyProtectionDelay?: number | null;
        /**
         * Protective function limit in V.
         */
        underVoltageProtection?: number | null;
        /**
         * Trip delay time in seconds.
         */
        underVoltageProtectionDelay?: number | null;
        /**
         * Protective function limit in V.
         */
        overVoltageProtection?: number | null;
        /**
         * Trip delay time in seconds.
         */
        overVoltageProtectionDelay?: number | null;
        /**
         * Sustained over voltage.
         */
        sustainedOverVoltage?: number | null;
        /**
         * Trip delay time in seconds.
         */
        sustainedOverVoltageDelay?: number | null;
        /**
         * Rate of change of frequency trip point (Hz/s).
         */
        frequencyRateOfChange?: number | null;
        /**
         * Trip angle in degrees.
         */
        voltageVectorShift?: number | null;
        /**
         * Description of the form of inter-trip (e.g. 'from local substation').
         */
        interTripScheme?: string | null;
        /**
         * Trip voltage.
         */
        neutralVoltageDisplacement?: number | null;
        [k: string]: unknown;
      } | null;
      acConnections: {
        /**
         * AC Connection ID as defined in the DER register.  Does not align with CDR ID permanence standards
         */
        connectionIdentifier: number;
        /**
         * Number of AC Connections in the group. For the suite of AC Connections to be considered as a group, all of the AC Connections included must have the same attributes
         */
        count: string;
        /**
         * Indicates whether the DER device is connected via an inverter (and what category of inverter it is) or not (e.g. rotating machine). If absent, assume equipment type to be “OTHER”.
         */
        equipmentType?: ("INVERTER" | "OTHER") | null;
        /**
         * The name of the inverter manufacturer. Mandatory if equipmentType is INVERTER
         */
        manufacturerName?: string | null;
        /**
         * The inverter series. Mandatory if equipmentType is INVERTER
         */
        inverterSeries?: string | null;
        /**
         * The inverter model number. Mandatory if equipmentType is INVERTER
         */
        inverterModelNumber?: string | null;
        /**
         * The date that the DER installation is commissioned
         */
        commissioningDate: string;
        /**
         * Code used to indicate the status of the Inverter. This will be used to identify if an inverter is active or inactive or decommissioned
         */
        status: "ACTIVE" | "INACTIVE" | "DECOMMISSIONED";
        /**
         * The rated AC output power that is listed in the product specified by the manufacturer. Mandatory if equipmentType is INVERTER
         */
        inverterDeviceCapacity?: number | null;
        derDevices: {
          /**
           * Unique identifier for a single DER device or a group of DER devices with the same attributes. Does not align with CDR ID permanence standards
           */
          deviceIdentifier: number;
          /**
           * Number of devices in the group of DER devices
           */
          count: number;
          /**
           * The name of the device manufacturer. If absent then assumed to be “unknown”
           */
          manufacturer?: string;
          /**
           * The model number of the device. If absent then assumed to be “unknown”
           */
          modelNumber?: string | null;
          /**
           * Code used to indicate the status of the device. This will be used to identify if an inverter is active or inactive or decommissioned
           */
          status?: ("ACTIVE" | "INACTIVE" | "DECOMMISSIONED") | null;
          /**
           * Used to indicate the primary technology used in the DER device
           */
          type: "FOSSIL" | "HYDRO" | "WIND" | "SOLAR_PV" | "RENEWABLE" | "GEOTHERMAL" | "STORAGE" | "OTHER";
          /**
           * Used to indicate the primary technology used in the DER device. This field is also used to record for example the battery chemistry, or the type of PV panel. It is also used to record if a battery is contained in an electric vehicle connected in a vehicle-to-grid arrangement. If absent then assumed to be “other”
           */
          subtype?: string | null;
          /**
           * Maximum output in kVA that is listed in the product specification by the manufacturer. This refers to the capacity of each unit within the device group
           */
          nominalRatedCapacity: number;
          /**
           * Maximum storage capacity in kVAh. This refers to the capacity of each storage module within the device group. Mandatory if type is equal to “STORAGE”
           */
          nominalStorageCapacity?: number | null;
          [k: string]: unknown;
        }[];
        [k: string]: unknown;
      }[];
      [k: string]: unknown;
    };
    links: {
      /**
       * Fully qualified link that generated the current response document
       */
      self: string;
      [k: string]: unknown;
    };
    meta: {
      [k: string]: unknown;
    };
    [k: string]: unknown;
  }
  export interface EnergyDerListResponse {
    data: {
      /**
       * Array of meter reads
       */
      derRecords: {
        /**
         * Tokenised ID of the service point to be used for referring to the service point in the CDR API suite.  To be created in accordance with CDR ID permanence requirements
         */
        servicePointId: string;
        /**
         * Approved small generating unit capacity as agreed with NSP in the connection agreement, expressed in kVA
         */
        approvedCapacity: number;
        /**
         * The number of phases available for the installation of DER
         */
        availablePhasesCount: number;
        /**
         * The number of phases that DER is connected to
         */
        installedPhasesCount: number;
        /**
         * For identification of small generating units designed with the ability to operate in an islanded mode
         */
        islandableInstallation: string;
        /**
         * For DER installations where NSPs specify the need for additional forms of protection above those inbuilt in an inverter.  If absent then assumed to be false
         */
        hasCentralProtectionControl?: boolean | null;
        /**
         * Required only when the hasCentralProtectionAndControl flag is set to true.  One or more of the object fields will be provided to describe the protection modes in place
         */
        protectionMode?: {
          /**
           * Maximum amount of power (kVA) that may be exported from a connection point to the grid, as monitored by a control / relay function. An absent value indicates no limit
           */
          exportLimitkva?: number | null;
          /**
           * Protective function limit in Hz.
           */
          underFrequencyProtection?: number | null;
          /**
           * Trip delay time in seconds.
           */
          underFrequencyProtectionDelay?: number | null;
          /**
           * Protective function limit in Hz.
           */
          overFrequencyProtection?: number | null;
          /**
           * Trip delay time in seconds.
           */
          overFrequencyProtectionDelay?: number | null;
          /**
           * Protective function limit in V.
           */
          underVoltageProtection?: number | null;
          /**
           * Trip delay time in seconds.
           */
          underVoltageProtectionDelay?: number | null;
          /**
           * Protective function limit in V.
           */
          overVoltageProtection?: number | null;
          /**
           * Trip delay time in seconds.
           */
          overVoltageProtectionDelay?: number | null;
          /**
           * Sustained over voltage.
           */
          sustainedOverVoltage?: number | null;
          /**
           * Trip delay time in seconds.
           */
          sustainedOverVoltageDelay?: number | null;
          /**
           * Rate of change of frequency trip point (Hz/s).
           */
          frequencyRateOfChange?: number | null;
          /**
           * Trip angle in degrees.
           */
          voltageVectorShift?: number | null;
          /**
           * Description of the form of inter-trip (e.g. 'from local substation').
           */
          interTripScheme?: string | null;
          /**
           * Trip voltage.
           */
          neutralVoltageDisplacement?: number | null;
          [k: string]: unknown;
        } | null;
        acConnections: {
          /**
           * AC Connection ID as defined in the DER register.  Does not align with CDR ID permanence standards
           */
          connectionIdentifier: number;
          /**
           * Number of AC Connections in the group. For the suite of AC Connections to be considered as a group, all of the AC Connections included must have the same attributes
           */
          count: string;
          /**
           * Indicates whether the DER device is connected via an inverter (and what category of inverter it is) or not (e.g. rotating machine). If absent, assume equipment type to be “OTHER”.
           */
          equipmentType?: ("INVERTER" | "OTHER") | null;
          /**
           * The name of the inverter manufacturer. Mandatory if equipmentType is INVERTER
           */
          manufacturerName?: string | null;
          /**
           * The inverter series. Mandatory if equipmentType is INVERTER
           */
          inverterSeries?: string | null;
          /**
           * The inverter model number. Mandatory if equipmentType is INVERTER
           */
          inverterModelNumber?: string | null;
          /**
           * The date that the DER installation is commissioned
           */
          commissioningDate: string;
          /**
           * Code used to indicate the status of the Inverter. This will be used to identify if an inverter is active or inactive or decommissioned
           */
          status: "ACTIVE" | "INACTIVE" | "DECOMMISSIONED";
          /**
           * The rated AC output power that is listed in the product specified by the manufacturer. Mandatory if equipmentType is INVERTER
           */
          inverterDeviceCapacity?: number | null;
          derDevices: {
            /**
             * Unique identifier for a single DER device or a group of DER devices with the same attributes. Does not align with CDR ID permanence standards
             */
            deviceIdentifier: number;
            /**
             * Number of devices in the group of DER devices
             */
            count: number;
            /**
             * The name of the device manufacturer. If absent then assumed to be “unknown”
             */
            manufacturer?: string;
            /**
             * The model number of the device. If absent then assumed to be “unknown”
             */
            modelNumber?: string | null;
            /**
             * Code used to indicate the status of the device. This will be used to identify if an inverter is active or inactive or decommissioned
             */
            status?: ("ACTIVE" | "INACTIVE" | "DECOMMISSIONED") | null;
            /**
             * Used to indicate the primary technology used in the DER device
             */
            type: "FOSSIL" | "HYDRO" | "WIND" | "SOLAR_PV" | "RENEWABLE" | "GEOTHERMAL" | "STORAGE" | "OTHER";
            /**
             * Used to indicate the primary technology used in the DER device. This field is also used to record for example the battery chemistry, or the type of PV panel. It is also used to record if a battery is contained in an electric vehicle connected in a vehicle-to-grid arrangement. If absent then assumed to be “other”
             */
            subtype?: string | null;
            /**
             * Maximum output in kVA that is listed in the product specification by the manufacturer. This refers to the capacity of each unit within the device group
             */
            nominalRatedCapacity: number;
            /**
             * Maximum storage capacity in kVAh. This refers to the capacity of each storage module within the device group. Mandatory if type is equal to “STORAGE”
             */
            nominalStorageCapacity?: number | null;
            [k: string]: unknown;
          }[];
          [k: string]: unknown;
        }[];
        [k: string]: unknown;
      }[];
      [k: string]: unknown;
    };
    links: {
      /**
       * Fully qualified link that generated the current response document
       */
      self: string;
      /**
       * URI to the first page of this set. Mandatory if this response is not the first page
       */
      first?: string | null;
      /**
       * URI to the previous page of this set. Mandatory if this response is not the first page
       */
      prev?: string | null;
      /**
       * URI to the next page of this set. Mandatory if this response is not the last page
       */
      next?: string | null;
      /**
       * URI to the last page of this set. Mandatory if this response is not the last page
       */
      last?: string | null;
      [k: string]: unknown;
    };
    meta: {
      /**
       * The total number of records in the full set. See [pagination](#pagination).
       */
      totalRecords: number;
      /**
       * The total number of pages in the full set. See [pagination](#pagination).
       */
      totalPages: number;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  }
  export interface EnergyDerRecord {
    /**
     * Tokenised ID of the service point to be used for referring to the service point in the CDR API suite.  To be created in accordance with CDR ID permanence requirements
     */
    servicePointId: string;
    /**
     * Approved small generating unit capacity as agreed with NSP in the connection agreement, expressed in kVA
     */
    approvedCapacity: number;
    /**
     * The number of phases available for the installation of DER
     */
    availablePhasesCount: number;
    /**
     * The number of phases that DER is connected to
     */
    installedPhasesCount: number;
    /**
     * For identification of small generating units designed with the ability to operate in an islanded mode
     */
    islandableInstallation: string;
    /**
     * For DER installations where NSPs specify the need for additional forms of protection above those inbuilt in an inverter.  If absent then assumed to be false
     */
    hasCentralProtectionControl?: boolean | null;
    /**
     * Required only when the hasCentralProtectionAndControl flag is set to true.  One or more of the object fields will be provided to describe the protection modes in place
     */
    protectionMode?: {
      /**
       * Maximum amount of power (kVA) that may be exported from a connection point to the grid, as monitored by a control / relay function. An absent value indicates no limit
       */
      exportLimitkva?: number | null;
      /**
       * Protective function limit in Hz.
       */
      underFrequencyProtection?: number | null;
      /**
       * Trip delay time in seconds.
       */
      underFrequencyProtectionDelay?: number | null;
      /**
       * Protective function limit in Hz.
       */
      overFrequencyProtection?: number | null;
      /**
       * Trip delay time in seconds.
       */
      overFrequencyProtectionDelay?: number | null;
      /**
       * Protective function limit in V.
       */
      underVoltageProtection?: number | null;
      /**
       * Trip delay time in seconds.
       */
      underVoltageProtectionDelay?: number | null;
      /**
       * Protective function limit in V.
       */
      overVoltageProtection?: number | null;
      /**
       * Trip delay time in seconds.
       */
      overVoltageProtectionDelay?: number | null;
      /**
       * Sustained over voltage.
       */
      sustainedOverVoltage?: number | null;
      /**
       * Trip delay time in seconds.
       */
      sustainedOverVoltageDelay?: number | null;
      /**
       * Rate of change of frequency trip point (Hz/s).
       */
      frequencyRateOfChange?: number | null;
      /**
       * Trip angle in degrees.
       */
      voltageVectorShift?: number | null;
      /**
       * Description of the form of inter-trip (e.g. 'from local substation').
       */
      interTripScheme?: string | null;
      /**
       * Trip voltage.
       */
      neutralVoltageDisplacement?: number | null;
      [k: string]: unknown;
    } | null;
    acConnections: {
      /**
       * AC Connection ID as defined in the DER register.  Does not align with CDR ID permanence standards
       */
      connectionIdentifier: number;
      /**
       * Number of AC Connections in the group. For the suite of AC Connections to be considered as a group, all of the AC Connections included must have the same attributes
       */
      count: string;
      /**
       * Indicates whether the DER device is connected via an inverter (and what category of inverter it is) or not (e.g. rotating machine). If absent, assume equipment type to be “OTHER”.
       */
      equipmentType?: ("INVERTER" | "OTHER") | null;
      /**
       * The name of the inverter manufacturer. Mandatory if equipmentType is INVERTER
       */
      manufacturerName?: string | null;
      /**
       * The inverter series. Mandatory if equipmentType is INVERTER
       */
      inverterSeries?: string | null;
      /**
       * The inverter model number. Mandatory if equipmentType is INVERTER
       */
      inverterModelNumber?: string | null;
      /**
       * The date that the DER installation is commissioned
       */
      commissioningDate: string;
      /**
       * Code used to indicate the status of the Inverter. This will be used to identify if an inverter is active or inactive or decommissioned
       */
      status: "ACTIVE" | "INACTIVE" | "DECOMMISSIONED";
      /**
       * The rated AC output power that is listed in the product specified by the manufacturer. Mandatory if equipmentType is INVERTER
       */
      inverterDeviceCapacity?: number | null;
      derDevices: {
        /**
         * Unique identifier for a single DER device or a group of DER devices with the same attributes. Does not align with CDR ID permanence standards
         */
        deviceIdentifier: number;
        /**
         * Number of devices in the group of DER devices
         */
        count: number;
        /**
         * The name of the device manufacturer. If absent then assumed to be “unknown”
         */
        manufacturer?: string;
        /**
         * The model number of the device. If absent then assumed to be “unknown”
         */
        modelNumber?: string | null;
        /**
         * Code used to indicate the status of the device. This will be used to identify if an inverter is active or inactive or decommissioned
         */
        status?: ("ACTIVE" | "INACTIVE" | "DECOMMISSIONED") | null;
        /**
         * Used to indicate the primary technology used in the DER device
         */
        type: "FOSSIL" | "HYDRO" | "WIND" | "SOLAR_PV" | "RENEWABLE" | "GEOTHERMAL" | "STORAGE" | "OTHER";
        /**
         * Used to indicate the primary technology used in the DER device. This field is also used to record for example the battery chemistry, or the type of PV panel. It is also used to record if a battery is contained in an electric vehicle connected in a vehicle-to-grid arrangement. If absent then assumed to be “other”
         */
        subtype?: string | null;
        /**
         * Maximum output in kVA that is listed in the product specification by the manufacturer. This refers to the capacity of each unit within the device group
         */
        nominalRatedCapacity: number;
        /**
         * Maximum storage capacity in kVAh. This refers to the capacity of each storage module within the device group. Mandatory if type is equal to “STORAGE”
         */
        nominalStorageCapacity?: number | null;
        [k: string]: unknown;
      }[];
      [k: string]: unknown;
    }[];
    [k: string]: unknown;
  }
  export interface EnergyInvoice {
    /**
     * The ID of the account for which the invoice was issued
     */
    accountId: string;
    /**
     * The number assigned to this invoice by the energy Retailer
     */
    invoiceNumber: string;
    /**
     * The date that the invoice was actually issued (as opposed to generated or calculated)
     */
    issueDate: string;
    /**
     * The date that the invoice is due to be paid
     */
    dueDate?: string | null;
    /**
     * Object containing the start and end date for the period covered by the invoice.  Mandatory if any usage or demand based charges are included in the invoice
     */
    period?: {
      /**
       * The start date of the period covered by this invoice
       */
      startDate: string;
      /**
       * The end date of the period covered by this invoice
       */
      endDate: string;
      [k: string]: unknown;
    } | null;
    /**
     * The net amount due for this invoice regardless of previous balance
     */
    invoiceAmount?: string | null;
    /**
     * The total GST amount for this invoice.  If absent then zero is assumed
     */
    gstAmount?: string | null;
    /**
     * A discount for on time payment
     */
    payOnTimeDiscount?: {
      /**
       * The amount that will be discounted if the invoice is paid by the date specified
       */
      discountAmount: string;
      /**
       * The GST amount that will be discounted if the invoice is paid by the date specified.  If absent then zero is assumed
       */
      gstAmount?: string | null;
      /**
       * The date by which the invoice must be paid to receive the pay on time discount
       */
      date: string;
      [k: string]: unknown;
    } | null;
    /**
     * The account balance at the time the invoice was issued
     */
    balanceAtIssue: string | null;
    /**
     * Array of service point IDs to which this invoice applies. May be empty if the invoice contains no electricity usage related charges
     */
    servicePoints: string[] | null;
    /**
     * Object containing charges and credits related to gas usage
     */
    gas?: {
      /**
       * The aggregate total of usage charges for the period covered by the invoice (exclusive of GST)
       */
      totalUsageCharges: string;
      /**
       * The aggregate total of generation credits for the period covered by the invoice (exclusive of GST)
       */
      totalGenerationCredits: string;
      /**
       * The aggregate total of any once off charges arising from electricity usage for the period covered by the invoice (exclusive of GST)
       */
      totalOnceOffCharges: string;
      /**
       * The aggregate total of any once off discounts or credits arising from electricity usage for the period covered by the invoice (exclusive of GST)
       */
      totalOnceOffDiscounts: string;
      /**
       * Optional array of charges that may be part of the invoice (for e.g. environmental charges for C&I consumers) (exclusive of GST)
       */
      otherCharges?:
        | {
            /**
             * Type of charge. Assumed to be other if absent
             */
            type?: ("ENVIRONMENTAL" | "REGULATED" | "NETWORK" | "METERING" | "RETAIL_SERVICE" | "RCTI" | "OTHER") | null;
            /**
             * The aggregate total of charges for this item (exclusive of GST)
             */
            amount: string;
            /**
             * A free text description of the type of charge
             */
            description: string;
            [k: string]: unknown;
          }[]
        | null;
      /**
       * The total GST for all electricity usage charges.  If absent then zero is assumed
       */
      totalGst?: string | null;
      [k: string]: unknown;
    } | null;
    /**
     * Object containing charges and credits related to electricity usage
     */
    electricity?: {
      /**
       * The aggregate total of usage charges for the period covered by the invoice (exclusive of GST)
       */
      totalUsageCharges: string;
      /**
       * The aggregate total of generation credits for the period covered by the invoice (exclusive of GST)
       */
      totalGenerationCredits: string;
      /**
       * The aggregate total of any once off charges arising from electricity usage for the period covered by the invoice (exclusive of GST)
       */
      totalOnceOffCharges: string;
      /**
       * The aggregate total of any once off discounts or credits arising from electricity usage for the period covered by the invoice (exclusive of GST)
       */
      totalOnceOffDiscounts: string;
      /**
       * Optional array of charges that may be part of the invoice (for e.g. environmental charges for C&I consumers) (exclusive of GST)
       */
      otherCharges?:
        | {
            /**
             * Type of charge. Assumed to be other if absent
             */
            type?: ("ENVIRONMENTAL" | "REGULATED" | "NETWORK" | "METERING" | "RETAIL_SERVICE" | "RCTI" | "OTHER") | null;
            /**
             * The aggregate total of charges for this item (exclusive of GST)
             */
            amount: string;
            /**
             * A free text description of the type of charge
             */
            description: string;
            [k: string]: unknown;
          }[]
        | null;
      /**
       * The total GST for all electricity usage charges.  If absent then zero is assumed
       */
      totalGst?: string | null;
      [k: string]: unknown;
    } | null;
    /**
     * Object contain charges and credits related to electricity usage
     */
    accountCharges?: {
      /**
       * The aggregate total of account level charges for the period covered by the invoice
       */
      totalCharges: string;
      /**
       * The aggregate total of account level discounts or credits for the period covered by the invoice
       */
      totalDiscounts: string;
      /**
       * The total GST for all account level charges.  If absent then zero is assumed
       */
      totalGst?: string | null;
      [k: string]: unknown;
    } | null;
    /**
     * Indicator of the payment status for the invoice
     */
    paymentStatus: "PAID" | "PARTIALLY_PAID" | "NOT_PAID";
    [k: string]: unknown;
  }
/**
 * Object contain charges and credits related to electricity usage
 */
 export interface EnergyInvoiceAccountCharges {
  /**
   * The aggregate total of account level charges for the period covered by the invoice
   */
  totalCharges: string;
  /**
   * The aggregate total of account level discounts or credits for the period covered by the invoice
   */
  totalDiscounts: string;
  /**
   * The total GST for all account level charges.  If absent then zero is assumed
   */
  totalGst?: string | null;
  [k: string]: unknown;
}

export interface EnergyInvoiceElectricityUsageCharges {
  /**
   * The aggregate total of usage charges for the period covered by the invoice (exclusive of GST)
   */
  totalUsageCharges: string;
  /**
   * The aggregate total of generation credits for the period covered by the invoice (exclusive of GST)
   */
  totalGenerationCredits: string;
  /**
   * The aggregate total of any once off charges arising from electricity usage for the period covered by the invoice (exclusive of GST)
   */
  totalOnceOffCharges: string;
  /**
   * The aggregate total of any once off discounts or credits arising from electricity usage for the period covered by the invoice (exclusive of GST)
   */
  totalOnceOffDiscounts: string;
  /**
   * Optional array of charges that may be part of the invoice (for e.g. environmental charges for C&I consumers) (exclusive of GST)
   */
  otherCharges?:
    | {
        /**
         * Type of charge. Assumed to be other if absent
         */
        type?: ("ENVIRONMENTAL" | "REGULATED" | "NETWORK" | "METERING" | "RETAIL_SERVICE" | "RCTI" | "OTHER") | null;
        /**
         * The aggregate total of charges for this item (exclusive of GST)
         */
        amount: string;
        /**
         * A free text description of the type of charge
         */
        description: string;
        [k: string]: unknown;
      }[]
    | null;
  /**
   * The total GST for all electricity usage charges.  If absent then zero is assumed
   */
  totalGst?: string | null;
  [k: string]: unknown;
}
export interface EnergyInvoiceGasUsageCharges {
  /**
   * The aggregate total of usage charges for the period covered by the invoice (exclusive of GST)
   */
  totalUsageCharges: string;
  /**
   * The aggregate total of generation credits for the period covered by the invoice (exclusive of GST)
   */
  totalGenerationCredits: string;
  /**
   * The aggregate total of any once off charges arising from electricity usage for the period covered by the invoice (exclusive of GST)
   */
  totalOnceOffCharges: string;
  /**
   * The aggregate total of any once off discounts or credits arising from electricity usage for the period covered by the invoice (exclusive of GST)
   */
  totalOnceOffDiscounts: string;
  /**
   * Optional array of charges that may be part of the invoice (for e.g. environmental charges for C&I consumers) (exclusive of GST)
   */
  otherCharges?:
    | {
        /**
         * Type of charge. Assumed to be other if absent
         */
        type?: ("ENVIRONMENTAL" | "REGULATED" | "NETWORK" | "METERING" | "RETAIL_SERVICE" | "RCTI" | "OTHER") | null;
        /**
         * The aggregate total of charges for this item (exclusive of GST)
         */
        amount: string;
        /**
         * A free text description of the type of charge
         */
        description: string;
        [k: string]: unknown;
      }[]
    | null;
  /**
   * The total GST for all electricity usage charges.  If absent then zero is assumed
   */
  totalGst?: string | null;
  [k: string]: unknown;
}

export interface EnergyInvoiceListResponse {
  data: {
    /**
     * Array of invoices sorted by date in descending order
     */
    invoices: {
      /**
       * The ID of the account for which the invoice was issued
       */
      accountId: string;
      /**
       * The number assigned to this invoice by the energy Retailer
       */
      invoiceNumber: string;
      /**
       * The date that the invoice was actually issued (as opposed to generated or calculated)
       */
      issueDate: string;
      /**
       * The date that the invoice is due to be paid
       */
      dueDate?: string | null;
      /**
       * Object containing the start and end date for the period covered by the invoice.  Mandatory if any usage or demand based charges are included in the invoice
       */
      period?: {
        /**
         * The start date of the period covered by this invoice
         */
        startDate: string;
        /**
         * The end date of the period covered by this invoice
         */
        endDate: string;
        [k: string]: unknown;
      } | null;
      /**
       * The net amount due for this invoice regardless of previous balance
       */
      invoiceAmount?: string | null;
      /**
       * The total GST amount for this invoice.  If absent then zero is assumed
       */
      gstAmount?: string | null;
      /**
       * A discount for on time payment
       */
      payOnTimeDiscount?: {
        /**
         * The amount that will be discounted if the invoice is paid by the date specified
         */
        discountAmount: string;
        /**
         * The GST amount that will be discounted if the invoice is paid by the date specified.  If absent then zero is assumed
         */
        gstAmount?: string | null;
        /**
         * The date by which the invoice must be paid to receive the pay on time discount
         */
        date: string;
        [k: string]: unknown;
      } | null;
      /**
       * The account balance at the time the invoice was issued
       */
      balanceAtIssue: string | null;
      /**
       * Array of service point IDs to which this invoice applies. May be empty if the invoice contains no electricity usage related charges
       */
      servicePoints: string[] | null;
      /**
       * Object containing charges and credits related to gas usage
       */
      gas?: {
        /**
         * The aggregate total of usage charges for the period covered by the invoice (exclusive of GST)
         */
        totalUsageCharges: string;
        /**
         * The aggregate total of generation credits for the period covered by the invoice (exclusive of GST)
         */
        totalGenerationCredits: string;
        /**
         * The aggregate total of any once off charges arising from electricity usage for the period covered by the invoice (exclusive of GST)
         */
        totalOnceOffCharges: string;
        /**
         * The aggregate total of any once off discounts or credits arising from electricity usage for the period covered by the invoice (exclusive of GST)
         */
        totalOnceOffDiscounts: string;
        /**
         * Optional array of charges that may be part of the invoice (for e.g. environmental charges for C&I consumers) (exclusive of GST)
         */
        otherCharges?:
          | {
              /**
               * Type of charge. Assumed to be other if absent
               */
              type?:
                | ("ENVIRONMENTAL" | "REGULATED" | "NETWORK" | "METERING" | "RETAIL_SERVICE" | "RCTI" | "OTHER")
                | null;
              /**
               * The aggregate total of charges for this item (exclusive of GST)
               */
              amount: string;
              /**
               * A free text description of the type of charge
               */
              description: string;
              [k: string]: unknown;
            }[]
          | null;
        /**
         * The total GST for all electricity usage charges.  If absent then zero is assumed
         */
        totalGst?: string | null;
        [k: string]: unknown;
      } | null;
      /**
       * Object containing charges and credits related to electricity usage
       */
      electricity?: {
        /**
         * The aggregate total of usage charges for the period covered by the invoice (exclusive of GST)
         */
        totalUsageCharges: string;
        /**
         * The aggregate total of generation credits for the period covered by the invoice (exclusive of GST)
         */
        totalGenerationCredits: string;
        /**
         * The aggregate total of any once off charges arising from electricity usage for the period covered by the invoice (exclusive of GST)
         */
        totalOnceOffCharges: string;
        /**
         * The aggregate total of any once off discounts or credits arising from electricity usage for the period covered by the invoice (exclusive of GST)
         */
        totalOnceOffDiscounts: string;
        /**
         * Optional array of charges that may be part of the invoice (for e.g. environmental charges for C&I consumers) (exclusive of GST)
         */
        otherCharges?:
          | {
              /**
               * Type of charge. Assumed to be other if absent
               */
              type?:
                | ("ENVIRONMENTAL" | "REGULATED" | "NETWORK" | "METERING" | "RETAIL_SERVICE" | "RCTI" | "OTHER")
                | null;
              /**
               * The aggregate total of charges for this item (exclusive of GST)
               */
              amount: string;
              /**
               * A free text description of the type of charge
               */
              description: string;
              [k: string]: unknown;
            }[]
          | null;
        /**
         * The total GST for all electricity usage charges.  If absent then zero is assumed
         */
        totalGst?: string | null;
        [k: string]: unknown;
      } | null;
      /**
       * Object contain charges and credits related to electricity usage
       */
      accountCharges?: {
        /**
         * The aggregate total of account level charges for the period covered by the invoice
         */
        totalCharges: string;
        /**
         * The aggregate total of account level discounts or credits for the period covered by the invoice
         */
        totalDiscounts: string;
        /**
         * The total GST for all account level charges.  If absent then zero is assumed
         */
        totalGst?: string | null;
        [k: string]: unknown;
      } | null;
      /**
       * Indicator of the payment status for the invoice
       */
      paymentStatus: "PAID" | "PARTIALLY_PAID" | "NOT_PAID";
      [k: string]: unknown;
    }[];
    [k: string]: unknown;
  };
  links: {
    /**
     * Fully qualified link that generated the current response document
     */
    self: string;
    /**
     * URI to the first page of this set. Mandatory if this response is not the first page
     */
    first?: string | null;
    /**
     * URI to the previous page of this set. Mandatory if this response is not the first page
     */
    prev?: string | null;
    /**
     * URI to the next page of this set. Mandatory if this response is not the last page
     */
    next?: string | null;
    /**
     * URI to the last page of this set. Mandatory if this response is not the last page
     */
    last?: string | null;
    [k: string]: unknown;
  };
  meta: {
    /**
     * The total number of records in the full set. See [pagination](#pagination).
     */
    totalRecords: number;
    /**
     * The total number of pages in the full set. See [pagination](#pagination).
     */
    totalPages: number;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}

export interface EnergyPaymentSchedule {
  /**
   * Optional payment amount indicating that a constant payment amount is scheduled to be paid (used in bill smooting scenarios)
   */
  amount?: string;
  /**
   * The type of object present in this response
   */
  paymentScheduleUType: "cardDebit" | "directDebit" | "manualPayment";
  /**
   * Represents a regular credit card payment schedule. Mandatory if paymentScheduleUType is set to cardDebit
   */
  cardDebit?: {
    /**
     * The type of credit card held on file
     */
    cardScheme: "VISA" | "MASTERCARD" | "AMEX" | "DINERS" | "OTHER" | "UNKNOWN";
    /**
     * The frequency that payments will occur.  Formatted according to [ISO 8601 Durations](https://en.wikipedia.org/wiki/ISO_8601#Durations) (excludes recurrence syntax)
     */
    paymentFrequency: string;
    /**
     * The mechanism by which the payment amount is calculated.  Explanation of values are as follows:<br/><ul><li>**STATIC** - Indicates a consistent, static amount, per payment</li><li>**BALANCE** - Indicates that the outstanding balance for the account is paid per period</li><li>**CALCULATED** - Indicates that the payment amount is variable and calculated using a pre-defined algorithm</li></ul>
     */
    calculationType: "STATIC" | "BALANCE" | "CALCULATED";
    [k: string]: unknown;
  } | null;
  /**
   * Represents a regular direct debit from a specified bank account. Mandatory if paymentScheduleUType is set to directDebit
   */
  directDebit?: {
    /**
     * Flag indicating that the account details are tokenised and cannot be shared.  False if absent.  If false then bsb and accountNumber should not be expected to be included
     */
    isTokenised?: string | null;
    /**
     * The unmasked BSB for the account to be debited. Is expected to be formatted as digits only with leading zeros included and no punctuation or spaces.  Is required if isTokenised is absent or false
     */
    bsb?: string | null;
    /**
     * The unmasked account number for the account to be debited. Is expected to be formatted as digits only with leading zeros included and no punctuation or spaces.  Is required if isTokenised is absent or false
     */
    accountNumber?: string | null;
    /**
     * The frequency that payments will occur.  Formatted according to [ISO 8601 Durations](https://en.wikipedia.org/wiki/ISO_8601#Durations) (excludes recurrence syntax)
     */
    paymentFrequency: string;
    /**
     * The mechanism by which the payment amount is calculated.  Explanation of values are as follows:<br/><ul><li>**STATIC** - Indicates a consistent, static amount, per payment</li><li>**BALANCE** - Indicates that the outstanding balance for the account is paid per period</li><li>**CALCULATED** - Indicates that the payment amount is variable and calculated using a pre-defined algorithm</li></ul>
     */
    calculationType: "STATIC" | "BALANCE" | "CALCULATED";
    [k: string]: unknown;
  } | null;
  /**
   * Represents a manual payment schedule where the customer pays in response to a delivered statement. Mandatory if paymentScheduleUType is set to manualPayment
   */
  manualPayment?: {
    /**
     * The frequency with which a bill will be issued.  Formatted according to [ISO 8601 Durations](https://en.wikipedia.org/wiki/ISO_8601#Durations) (excludes recurrence syntax)
     */
    billFrequency: string;
    [k: string]: unknown;
  } | null;
  [k: string]: unknown;
}
export interface EnergyPaymentScheduleResponse {
  data: {
    /**
     * Optional payment amount indicating that a constant payment amount is scheduled to be paid (used in bill smooting scenarios)
     */
    amount?: string;
    /**
     * The type of object present in this response
     */
    paymentScheduleUType: "cardDebit" | "directDebit" | "manualPayment";
    /**
     * Represents a regular credit card payment schedule. Mandatory if paymentScheduleUType is set to cardDebit
     */
    cardDebit?: {
      /**
       * The type of credit card held on file
       */
      cardScheme: "VISA" | "MASTERCARD" | "AMEX" | "DINERS" | "OTHER" | "UNKNOWN";
      /**
       * The frequency that payments will occur.  Formatted according to [ISO 8601 Durations](https://en.wikipedia.org/wiki/ISO_8601#Durations) (excludes recurrence syntax)
       */
      paymentFrequency: string;
      /**
       * The mechanism by which the payment amount is calculated.  Explanation of values are as follows:<br/><ul><li>**STATIC** - Indicates a consistent, static amount, per payment</li><li>**BALANCE** - Indicates that the outstanding balance for the account is paid per period</li><li>**CALCULATED** - Indicates that the payment amount is variable and calculated using a pre-defined algorithm</li></ul>
       */
      calculationType: "STATIC" | "BALANCE" | "CALCULATED";
      [k: string]: unknown;
    } | null;
    /**
     * Represents a regular direct debit from a specified bank account. Mandatory if paymentScheduleUType is set to directDebit
     */
    directDebit?: {
      /**
       * Flag indicating that the account details are tokenised and cannot be shared.  False if absent.  If false then bsb and accountNumber should not be expected to be included
       */
      isTokenised?: string | null;
      /**
       * The unmasked BSB for the account to be debited. Is expected to be formatted as digits only with leading zeros included and no punctuation or spaces.  Is required if isTokenised is absent or false
       */
      bsb?: string | null;
      /**
       * The unmasked account number for the account to be debited. Is expected to be formatted as digits only with leading zeros included and no punctuation or spaces.  Is required if isTokenised is absent or false
       */
      accountNumber?: string | null;
      /**
       * The frequency that payments will occur.  Formatted according to [ISO 8601 Durations](https://en.wikipedia.org/wiki/ISO_8601#Durations) (excludes recurrence syntax)
       */
      paymentFrequency: string;
      /**
       * The mechanism by which the payment amount is calculated.  Explanation of values are as follows:<br/><ul><li>**STATIC** - Indicates a consistent, static amount, per payment</li><li>**BALANCE** - Indicates that the outstanding balance for the account is paid per period</li><li>**CALCULATED** - Indicates that the payment amount is variable and calculated using a pre-defined algorithm</li></ul>
       */
      calculationType: "STATIC" | "BALANCE" | "CALCULATED";
      [k: string]: unknown;
    } | null;
    /**
     * Represents a manual payment schedule where the customer pays in response to a delivered statement. Mandatory if paymentScheduleUType is set to manualPayment
     */
    manualPayment?: {
      /**
       * The frequency with which a bill will be issued.  Formatted according to [ISO 8601 Durations](https://en.wikipedia.org/wiki/ISO_8601#Durations) (excludes recurrence syntax)
       */
      billFrequency: string;
      [k: string]: unknown;
    } | null;
    [k: string]: unknown;
  };
  links: {
    /**
     * Fully qualified link that generated the current response document
     */
    self: string;
    [k: string]: unknown;
  };
  meta: {
    [k: string]: unknown;
  };
  [k: string]: unknown;
}

export interface EnergyPlan {
  /**
   * The ID of the specific plan
   */
  planId: string;
  /**
   * The date and time from which this plan is effective (ie. is available for origination). Used to enable the articulation of products to the regime before they are available for customers to originate
   */
  effectiveFrom?: string | null;
  /**
   * The date and time at which this plan will be retired and will no longer be offered. Used to enable the managed deprecation of plans
   */
  effectiveTo?: string | null;
  /**
   * The last date and time that the information for this plan was changed (or the creation date for the plan if it has never been altered)
   */
  lastUpdated: string;
  /**
   * The display name of the plan
   */
  displayName?: string | null;
  /**
   * A description of the plan
   */
  description?: string | null;
  /**
   * The type of the plan
   */
  type: "STANDING" | "MARKET" | "REGULATED";
  /**
   * The fuel types covered by the plan
   */
  fuelType: "ELECTRICITY" | "GAS" | "DUAL";
  /**
   * The ID of the brand under which this plan is offered
   */
  brand: string;
  /**
   * The display name of the brand under which this plan is offered
   */
  brandName: string;
  /**
   * A link to an application web page where this plan can be applied for
   */
  applicationUri?: string | null;
  /**
   * Object that contains links to additional information on specific topics
   */
  additionalInformation?: {
    /**
     * A link to a general overview of the plan
     */
    overviewUri?: string;
    /**
     * A link to terms and conditions for the plan
     */
    termsUri?: string | null;
    /**
     * A link to detail on eligibility criteria for the plan
     */
    eligibilityUri?: string | null;
    /**
     * A link to detail on pricing for the plan
     */
    pricingUri?: string | null;
    /**
     * A link to detail on bundles that this plan can be a part of
     */
    bundleUri?: string | null;
    [k: string]: unknown;
  } | null;
  /**
   * The type of customer that the plan is offered to.  If absent then the plan is available to all customers
   */
  customerType?: ("RESIDENTIAL" | "BUSINESS") | null;
  /**
   * Describes the geographical area that the plan is available for.  If absent then it is assumed the plan is not geographically limited
   */
  geography?: {
    /**
     * Array of valid Australian post codes that are specifically excluded from the plan.  Each element is a single four digit postcode (e.g. 3000) or a range of postcodes defined by two four digit postcodes and a hyphen (e.g. 3000-3999)
     */
    excludedPostcodes?: string[] | null;
    /**
     * Array of valid Australian post codes that are included from the plan.  If absent defaults to all non-excluded post codes.  Each element is a single four digit postcode (e.g. 3000) or a range of postcodes defined by two four digit postcodes and a hyphen (e.g. 3000-3999)
     */
    includedPostcodes?: string[] | null;
    [k: string]: unknown;
  } | null;
  [k: string]: unknown;
}

export interface EnergyPlanContract {
  /**
   * Free text field containing additional information of the fees for this contract
   */
  additionalFeeInformation?: string | null;
  /**
   * The pricing model for the contract.  Contracts for gas must use SINGLE_RATE.  Note that the detail for the enumeration values are:<ul><li>**SINGLE_RATE** - all energy usage is charged at a single unit rate no matter when it is consumed. Multiple unit rates may exist that correspond to varying volumes of usage i.e. a ‘block’ or ‘step’ tariff (first 50kWh @ X cents, next 50kWh at Y cents etc.</li><li>**SINGLE_RATE_CONT_LOAD** - as above, but with an additional, separate unit rate charged for all energy usage from a controlled load i.e. separately metered appliance like hot water service, pool pump etc.</li><li>**TIME_OF_USE** - energy usage is charged at unit rates that vary dependent on time of day and day of week that the energy is consumed</li><li>**TIME_OF_USE_CONT_LOAD** - as above, but with an additional, separate unit rate charged for all energy usage from a controlled load i.e. separately metered appliance like hot water service, pool pump etc.</li><li>**FLEXIBLE** - energy usage is charged at unit rates that vary based on external factors</li><li>**FLEXIBLE_CONT_LOAD** - as above, but with an additional, separate unit rate charged for all energy usage from a controlled load i.e. separately metered appliance like hot water service, pool pump etc.</li><li>**QUOTA** - all energy usage is charged at a single fixed rate, up to a specified usage quota/allowance. All excess usage beyond the allowance is then charged at a single unit rate (may not be the best way to explain it but it is essentially a ‘subscription’ or telco style product i.e. $50/month for up to 150kWh included usage</li></ul>
   */
  pricingModel:
    | "SINGLE_RATE"
    | "SINGLE_RATE_CONT_LOAD"
    | "TIME_OF_USE"
    | "TIME_OF_USE_CONT_LOAD"
    | "FLEXIBLE"
    | "FLEXIBLE_CONT_LOAD"
    | "QUOTA";
  /**
   * Required if pricingModel is set to TIME_OF_USE.  Defines the time zone to use for calculation of the time of use thresholds
   */
  timeZone?: ("LOCAL" | "AEST") | null;
  /**
   * Flag indicating whether prices are fixed or variable
   */
  isFixed: boolean;
  /**
   * Free text description of price variation policy and conditions for the contract.  Mandatory if isFixed is true
   */
  variation?: string | null;
  /**
   * Free text field that describes what will occur on or prior to expiry of the fixed contract term or benefit period
   */
  onExpiryDescription?: string | null;
  /**
   * Payment options for this contract
   */
  paymentOption: ("PAPER_BILL" | "CREDIT_CARD" | "DIRECT_DEBIT" | "BPAY" | "OTHER")[];
  /**
   * Describes intrinsic green power for the plan.  If present then the plan includes a percentage of green power in the base plan. Should not be present for gas contracts
   */
  intrinsicGreenPower?: {
    /**
     * Percentage of green power intrinsically included in the plan
     */
    greenPercentage: string;
    [k: string]: unknown;
  } | null;
  /**
   * Required if pricing model is SINGLE_RATE_CONT_LOAD or TIME_OF_USE_CONT_LOAD or FLEXIBLE_CONT_LOAD
   */
  controlledLoad?: {
    /**
     * A display name for the controlled load tier
     */
    displayName: string;
    /**
     * A description of the controlled load tier
     */
    description?: string | null;
    /**
     * The daily supply charge (exclusive of GST) for this controlled load tier
     */
    dailyCharge: string;
    /**
     * The period for which the controlled load rate applies. Formatted according to [ISO 8601 Durations](https://en.wikipedia.org/wiki/ISO_8601#Durations) (excludes recurrence syntax)
     */
    period: string;
    /**
     * Array of controlled load rates in order of usage volume
     */
    rates: {
      /**
       * Unit price of usage per kWh (exclusive of GST)
       */
      unitPrice: string;
      /**
       * Volume in kWh that this rate applies to.  Only applicable for ‘stepped’ rates where different rates apply for different volumes of usage in a period
       */
      volume?: number | null;
      [k: string]: unknown;
    }[];
    [k: string]: unknown;
  } | null;
  /**
   * Optional list of incentives available for the contract
   */
  incentives?: {
    [k: string]: unknown;
  } | null;
  /**
   * Optional list of discounts available for the contract
   */
  discounts?: {
    [k: string]: unknown;
  } | null;
  /**
   * Optional list of charges applicable to green power
   */
  greenPowerCharges?: {
    [k: string]: unknown;
  } | null;
  /**
   * Eligibility restrictions or requirements
   */
  eligibility?: {
    [k: string]: unknown;
  } | null;
  /**
   * An array of fees applicable to the plan
   */
  fees?: {
    [k: string]: unknown;
  } | null;
  /**
   * Array of feed in tariffs for solar power
   */
  solarFeedInTariff?: {
    [k: string]: unknown;
  } | null;
  /**
   * Array of tariff periods
   */
  tariffPeriod: {
    [k: string]: unknown;
  };
  [k: string]: unknown;
}

export type EnergyPlanContractFull = {
  /**
   * Free text field containing additional information of the fees for this contract
   */
  additionalFeeInformation?: string | null;
  /**
   * The pricing model for the contract.  Contracts for gas must use SINGLE_RATE.  Note that the detail for the enumeration values are:<ul><li>**SINGLE_RATE** - all energy usage is charged at a single unit rate no matter when it is consumed. Multiple unit rates may exist that correspond to varying volumes of usage i.e. a ‘block’ or ‘step’ tariff (first 50kWh @ X cents, next 50kWh at Y cents etc.</li><li>**SINGLE_RATE_CONT_LOAD** - as above, but with an additional, separate unit rate charged for all energy usage from a controlled load i.e. separately metered appliance like hot water service, pool pump etc.</li><li>**TIME_OF_USE** - energy usage is charged at unit rates that vary dependent on time of day and day of week that the energy is consumed</li><li>**TIME_OF_USE_CONT_LOAD** - as above, but with an additional, separate unit rate charged for all energy usage from a controlled load i.e. separately metered appliance like hot water service, pool pump etc.</li><li>**FLEXIBLE** - energy usage is charged at unit rates that vary based on external factors</li><li>**FLEXIBLE_CONT_LOAD** - as above, but with an additional, separate unit rate charged for all energy usage from a controlled load i.e. separately metered appliance like hot water service, pool pump etc.</li><li>**QUOTA** - all energy usage is charged at a single fixed rate, up to a specified usage quota/allowance. All excess usage beyond the allowance is then charged at a single unit rate (may not be the best way to explain it but it is essentially a ‘subscription’ or telco style product i.e. $50/month for up to 150kWh included usage</li></ul>
   */
  pricingModel:
    | "SINGLE_RATE"
    | "SINGLE_RATE_CONT_LOAD"
    | "TIME_OF_USE"
    | "TIME_OF_USE_CONT_LOAD"
    | "FLEXIBLE"
    | "FLEXIBLE_CONT_LOAD"
    | "QUOTA";
  /**
   * Required if pricingModel is set to TIME_OF_USE.  Defines the time zone to use for calculation of the time of use thresholds
   */
  timeZone?: ("LOCAL" | "AEST") | null;
  /**
   * Flag indicating whether prices are fixed or variable
   */
  isFixed: boolean;
  /**
   * Free text description of price variation policy and conditions for the contract.  Mandatory if isFixed is true
   */
  variation?: string | null;
  /**
   * Free text field that describes what will occur on or prior to expiry of the fixed contract term or benefit period
   */
  onExpiryDescription?: string | null;
  /**
   * Payment options for this contract
   */
  paymentOption: ("PAPER_BILL" | "CREDIT_CARD" | "DIRECT_DEBIT" | "BPAY" | "OTHER")[];
  /**
   * Describes intrinsic green power for the plan.  If present then the plan includes a percentage of green power in the base plan. Should not be present for gas contracts
   */
  intrinsicGreenPower?: {
    /**
     * Percentage of green power intrinsically included in the plan
     */
    greenPercentage: string;
    [k: string]: unknown;
  } | null;
  /**
   * Required if pricing model is SINGLE_RATE_CONT_LOAD or TIME_OF_USE_CONT_LOAD or FLEXIBLE_CONT_LOAD
   */
  controlledLoad?: {
    /**
     * A display name for the controlled load tier
     */
    displayName: string;
    /**
     * A description of the controlled load tier
     */
    description?: string | null;
    /**
     * The daily supply charge (exclusive of GST) for this controlled load tier
     */
    dailyCharge: string;
    /**
     * The period for which the controlled load rate applies. Formatted according to [ISO 8601 Durations](https://en.wikipedia.org/wiki/ISO_8601#Durations) (excludes recurrence syntax)
     */
    period: string;
    /**
     * Array of controlled load rates in order of usage volume
     */
    rates: {
      /**
       * Unit price of usage per kWh (exclusive of GST)
       */
      unitPrice: string;
      /**
       * Volume in kWh that this rate applies to.  Only applicable for ‘stepped’ rates where different rates apply for different volumes of usage in a period
       */
      volume?: number | null;
      [k: string]: unknown;
    }[];
    [k: string]: unknown;
  } | null;
  /**
   * Optional list of incentives available for the contract
   */
  incentives?: {
    [k: string]: unknown;
  } | null;
  /**
   * Optional list of discounts available for the contract
   */
  discounts?: {
    [k: string]: unknown;
  } | null;
  /**
   * Optional list of charges applicable to green power
   */
  greenPowerCharges?: {
    [k: string]: unknown;
  } | null;
  /**
   * Eligibility restrictions or requirements
   */
  eligibility?: {
    [k: string]: unknown;
  } | null;
  /**
   * An array of fees applicable to the plan
   */
  fees?: {
    [k: string]: unknown;
  } | null;
  /**
   * Array of feed in tariffs for solar power
   */
  solarFeedInTariff?: {
    [k: string]: unknown;
  } | null;
  /**
   * Array of tariff periods
   */
  tariffPeriod: {
    [k: string]: unknown;
  };
  [k: string]: unknown;
} & {
  /**
   * The term for the contract.  If absent assumes no specified term
   */
  termType?: ("1_YEAR" | "2_YEAR" | "3_YEAR" | "4_YEAR" | "5_YEAR" | "ONGOING" | "OTHER") | null;
  /**
   * Description of the benefit period.  Should only be present if termType has the value ONGOING
   */
  benefitPeriod?: string | null;
  /**
   * Free text description of the terms for the contract
   */
  terms?: string | null;
  /**
   * An array of the meter types that this contract is available for
   */
  meterTypes?: string[] | null;
  /**
   * Number of days in the cooling off period for the contract.  Mandatory for plans with type of MARKET
   */
  coolingOffDays?: string | null;
  /**
   * An array of the available billing schedules for this contract. Formatted according to [ISO 8601 Durations](https://en.wikipedia.org/wiki/ISO_8601#Durations) (excludes recurrence syntax)
   */
  billFrequency: string[];
  [k: string]: unknown;
};

/**
 * Required if pricing model is SINGLE_RATE_CONT_LOAD or TIME_OF_USE_CONT_LOAD or FLEXIBLE_CONT_LOAD
 */
 export interface EnergyPlanControlledLoad {
  /**
   * A display name for the controlled load tier
   */
  displayName: string;
  /**
   * A description of the controlled load tier
   */
  description?: string | null;
  /**
   * The daily supply charge (exclusive of GST) for this controlled load tier
   */
  dailyCharge: string;
  /**
   * The period for which the controlled load rate applies. Formatted according to [ISO 8601 Durations](https://en.wikipedia.org/wiki/ISO_8601#Durations) (excludes recurrence syntax)
   */
  period: string;
  /**
   * Array of controlled load rates in order of usage volume
   */
  rates: {
    /**
     * Unit price of usage per kWh (exclusive of GST)
     */
    unitPrice: string;
    /**
     * Volume in kWh that this rate applies to.  Only applicable for ‘stepped’ rates where different rates apply for different volumes of usage in a period
     */
    volume?: number | null;
    [k: string]: unknown;
  }[];
  [k: string]: unknown;
}

export type EnergyPlanDetail = {
  /**
   * The ID of the specific plan
   */
  planId: string;
  /**
   * The date and time from which this plan is effective (ie. is available for origination). Used to enable the articulation of products to the regime before they are available for customers to originate
   */
  effectiveFrom?: string | null;
  /**
   * The date and time at which this plan will be retired and will no longer be offered. Used to enable the managed deprecation of plans
   */
  effectiveTo?: string | null;
  /**
   * The last date and time that the information for this plan was changed (or the creation date for the plan if it has never been altered)
   */
  lastUpdated: string;
  /**
   * The display name of the plan
   */
  displayName?: string | null;
  /**
   * A description of the plan
   */
  description?: string | null;
  /**
   * The type of the plan
   */
  type: "STANDING" | "MARKET" | "REGULATED";
  /**
   * The fuel types covered by the plan
   */
  fuelType: "ELECTRICITY" | "GAS" | "DUAL";
  /**
   * The ID of the brand under which this plan is offered
   */
  brand: string;
  /**
   * The display name of the brand under which this plan is offered
   */
  brandName: string;
  /**
   * A link to an application web page where this plan can be applied for
   */
  applicationUri?: string | null;
  /**
   * Object that contains links to additional information on specific topics
   */
  additionalInformation?: {
    /**
     * A link to a general overview of the plan
     */
    overviewUri?: string;
    /**
     * A link to terms and conditions for the plan
     */
    termsUri?: string | null;
    /**
     * A link to detail on eligibility criteria for the plan
     */
    eligibilityUri?: string | null;
    /**
     * A link to detail on pricing for the plan
     */
    pricingUri?: string | null;
    /**
     * A link to detail on bundles that this plan can be a part of
     */
    bundleUri?: string | null;
    [k: string]: unknown;
  } | null;
  /**
   * The type of customer that the plan is offered to.  If absent then the plan is available to all customers
   */
  customerType?: ("RESIDENTIAL" | "BUSINESS") | null;
  /**
   * Describes the geographical area that the plan is available for.  If absent then it is assumed the plan is not geographically limited
   */
  geography?: {
    /**
     * Array of valid Australian post codes that are specifically excluded from the plan.  Each element is a single four digit postcode (e.g. 3000) or a range of postcodes defined by two four digit postcodes and a hyphen (e.g. 3000-3999)
     */
    excludedPostcodes?: string[] | null;
    /**
     * Array of valid Australian post codes that are included from the plan.  If absent defaults to all non-excluded post codes.  Each element is a single four digit postcode (e.g. 3000) or a range of postcodes defined by two four digit postcodes and a hyphen (e.g. 3000-3999)
     */
    includedPostcodes?: string[] | null;
    [k: string]: unknown;
  } | null;
  [k: string]: unknown;
} & {
  /**
   * Charges for metering included in the plan
   */
  meteringCharges?:
    | {
        /**
         * Display name of the charge
         */
        displayName: string;
        /**
         * Description of the charge
         */
        description?: string | null;
        /**
         * Minimum value of the charge if the charge is a range or the absolute value of the charge if no range is specified
         */
        minimumValue: string;
        /**
         * The upper limit of the charge if the charge could occur in a range
         */
        maximumValue?: string | null;
        /**
         * The charges that occur on a schedule indicates the frequency. Formatted according to [ISO 8601 Durations](https://en.wikipedia.org/wiki/ISO_8601#Durations) (excludes recurrence syntax)
         */
        period?: string | null;
        [k: string]: unknown;
      }[]
    | null;
  /**
   * The details of the terms for the supply of electricity under this plan.  Is mandatory if fuelType is set to GAS or DUAL
   */
  gasContract?: {
    /**
     * Free text field containing additional information of the fees for this contract
     */
    additionalFeeInformation?: string | null;
    /**
     * The pricing model for the contract.  Contracts for gas must use SINGLE_RATE.  Note that the detail for the enumeration values are:<ul><li>**SINGLE_RATE** - all energy usage is charged at a single unit rate no matter when it is consumed. Multiple unit rates may exist that correspond to varying volumes of usage i.e. a ‘block’ or ‘step’ tariff (first 50kWh @ X cents, next 50kWh at Y cents etc.</li><li>**SINGLE_RATE_CONT_LOAD** - as above, but with an additional, separate unit rate charged for all energy usage from a controlled load i.e. separately metered appliance like hot water service, pool pump etc.</li><li>**TIME_OF_USE** - energy usage is charged at unit rates that vary dependent on time of day and day of week that the energy is consumed</li><li>**TIME_OF_USE_CONT_LOAD** - as above, but with an additional, separate unit rate charged for all energy usage from a controlled load i.e. separately metered appliance like hot water service, pool pump etc.</li><li>**FLEXIBLE** - energy usage is charged at unit rates that vary based on external factors</li><li>**FLEXIBLE_CONT_LOAD** - as above, but with an additional, separate unit rate charged for all energy usage from a controlled load i.e. separately metered appliance like hot water service, pool pump etc.</li><li>**QUOTA** - all energy usage is charged at a single fixed rate, up to a specified usage quota/allowance. All excess usage beyond the allowance is then charged at a single unit rate (may not be the best way to explain it but it is essentially a ‘subscription’ or telco style product i.e. $50/month for up to 150kWh included usage</li></ul>
     */
    pricingModel:
      | "SINGLE_RATE"
      | "SINGLE_RATE_CONT_LOAD"
      | "TIME_OF_USE"
      | "TIME_OF_USE_CONT_LOAD"
      | "FLEXIBLE"
      | "FLEXIBLE_CONT_LOAD"
      | "QUOTA";
    /**
     * Required if pricingModel is set to TIME_OF_USE.  Defines the time zone to use for calculation of the time of use thresholds
     */
    timeZone?: ("LOCAL" | "AEST") | null;
    /**
     * Flag indicating whether prices are fixed or variable
     */
    isFixed: boolean;
    /**
     * Free text description of price variation policy and conditions for the contract.  Mandatory if isFixed is true
     */
    variation?: string | null;
    /**
     * Free text field that describes what will occur on or prior to expiry of the fixed contract term or benefit period
     */
    onExpiryDescription?: string | null;
    /**
     * Payment options for this contract
     */
    paymentOption: ("PAPER_BILL" | "CREDIT_CARD" | "DIRECT_DEBIT" | "BPAY" | "OTHER")[];
    /**
     * Describes intrinsic green power for the plan.  If present then the plan includes a percentage of green power in the base plan. Should not be present for gas contracts
     */
    intrinsicGreenPower?: {
      /**
       * Percentage of green power intrinsically included in the plan
       */
      greenPercentage: string;
      [k: string]: unknown;
    } | null;
    /**
     * Required if pricing model is SINGLE_RATE_CONT_LOAD or TIME_OF_USE_CONT_LOAD or FLEXIBLE_CONT_LOAD
     */
    controlledLoad?: {
      /**
       * A display name for the controlled load tier
       */
      displayName: string;
      /**
       * A description of the controlled load tier
       */
      description?: string | null;
      /**
       * The daily supply charge (exclusive of GST) for this controlled load tier
       */
      dailyCharge: string;
      /**
       * The period for which the controlled load rate applies. Formatted according to [ISO 8601 Durations](https://en.wikipedia.org/wiki/ISO_8601#Durations) (excludes recurrence syntax)
       */
      period: string;
      /**
       * Array of controlled load rates in order of usage volume
       */
      rates: {
        /**
         * Unit price of usage per kWh (exclusive of GST)
         */
        unitPrice: string;
        /**
         * Volume in kWh that this rate applies to.  Only applicable for ‘stepped’ rates where different rates apply for different volumes of usage in a period
         */
        volume?: number | null;
        [k: string]: unknown;
      }[];
      [k: string]: unknown;
    } | null;
    /**
     * Optional list of incentives available for the contract
     */
    incentives?: {
      [k: string]: unknown;
    } | null;
    /**
     * Optional list of discounts available for the contract
     */
    discounts?: {
      [k: string]: unknown;
    } | null;
    /**
     * Optional list of charges applicable to green power
     */
    greenPowerCharges?: {
      [k: string]: unknown;
    } | null;
    /**
     * Eligibility restrictions or requirements
     */
    eligibility?: {
      [k: string]: unknown;
    } | null;
    /**
     * An array of fees applicable to the plan
     */
    fees?: {
      [k: string]: unknown;
    } | null;
    /**
     * Array of feed in tariffs for solar power
     */
    solarFeedInTariff?: {
      [k: string]: unknown;
    } | null;
    /**
     * Array of tariff periods
     */
    tariffPeriod: {
      [k: string]: unknown;
    };
    [k: string]: unknown;
  } & {
    /**
     * The term for the contract.  If absent assumes no specified term
     */
    termType?: ("1_YEAR" | "2_YEAR" | "3_YEAR" | "4_YEAR" | "5_YEAR" | "ONGOING" | "OTHER") | null;
    /**
     * Description of the benefit period.  Should only be present if termType has the value ONGOING
     */
    benefitPeriod?: string | null;
    /**
     * Free text description of the terms for the contract
     */
    terms?: string | null;
    /**
     * An array of the meter types that this contract is available for
     */
    meterTypes?: string[] | null;
    /**
     * Number of days in the cooling off period for the contract.  Mandatory for plans with type of MARKET
     */
    coolingOffDays?: string | null;
    /**
     * An array of the available billing schedules for this contract. Formatted according to [ISO 8601 Durations](https://en.wikipedia.org/wiki/ISO_8601#Durations) (excludes recurrence syntax)
     */
    billFrequency: string[];
    [k: string]: unknown;
  };
  /**
   * The details of the terms for the supply of electricity under this plan.  Is mandatory if fuelType is set to ELECTRICITY or DUAL
   */
  electricityContract?: {
    /**
     * Free text field containing additional information of the fees for this contract
     */
    additionalFeeInformation?: string | null;
    /**
     * The pricing model for the contract.  Contracts for gas must use SINGLE_RATE.  Note that the detail for the enumeration values are:<ul><li>**SINGLE_RATE** - all energy usage is charged at a single unit rate no matter when it is consumed. Multiple unit rates may exist that correspond to varying volumes of usage i.e. a ‘block’ or ‘step’ tariff (first 50kWh @ X cents, next 50kWh at Y cents etc.</li><li>**SINGLE_RATE_CONT_LOAD** - as above, but with an additional, separate unit rate charged for all energy usage from a controlled load i.e. separately metered appliance like hot water service, pool pump etc.</li><li>**TIME_OF_USE** - energy usage is charged at unit rates that vary dependent on time of day and day of week that the energy is consumed</li><li>**TIME_OF_USE_CONT_LOAD** - as above, but with an additional, separate unit rate charged for all energy usage from a controlled load i.e. separately metered appliance like hot water service, pool pump etc.</li><li>**FLEXIBLE** - energy usage is charged at unit rates that vary based on external factors</li><li>**FLEXIBLE_CONT_LOAD** - as above, but with an additional, separate unit rate charged for all energy usage from a controlled load i.e. separately metered appliance like hot water service, pool pump etc.</li><li>**QUOTA** - all energy usage is charged at a single fixed rate, up to a specified usage quota/allowance. All excess usage beyond the allowance is then charged at a single unit rate (may not be the best way to explain it but it is essentially a ‘subscription’ or telco style product i.e. $50/month for up to 150kWh included usage</li></ul>
     */
    pricingModel:
      | "SINGLE_RATE"
      | "SINGLE_RATE_CONT_LOAD"
      | "TIME_OF_USE"
      | "TIME_OF_USE_CONT_LOAD"
      | "FLEXIBLE"
      | "FLEXIBLE_CONT_LOAD"
      | "QUOTA";
    /**
     * Required if pricingModel is set to TIME_OF_USE.  Defines the time zone to use for calculation of the time of use thresholds
     */
    timeZone?: ("LOCAL" | "AEST") | null;
    /**
     * Flag indicating whether prices are fixed or variable
     */
    isFixed: boolean;
    /**
     * Free text description of price variation policy and conditions for the contract.  Mandatory if isFixed is true
     */
    variation?: string | null;
    /**
     * Free text field that describes what will occur on or prior to expiry of the fixed contract term or benefit period
     */
    onExpiryDescription?: string | null;
    /**
     * Payment options for this contract
     */
    paymentOption: ("PAPER_BILL" | "CREDIT_CARD" | "DIRECT_DEBIT" | "BPAY" | "OTHER")[];
    /**
     * Describes intrinsic green power for the plan.  If present then the plan includes a percentage of green power in the base plan. Should not be present for gas contracts
     */
    intrinsicGreenPower?: {
      /**
       * Percentage of green power intrinsically included in the plan
       */
      greenPercentage: string;
      [k: string]: unknown;
    } | null;
    /**
     * Required if pricing model is SINGLE_RATE_CONT_LOAD or TIME_OF_USE_CONT_LOAD or FLEXIBLE_CONT_LOAD
     */
    controlledLoad?: {
      /**
       * A display name for the controlled load tier
       */
      displayName: string;
      /**
       * A description of the controlled load tier
       */
      description?: string | null;
      /**
       * The daily supply charge (exclusive of GST) for this controlled load tier
       */
      dailyCharge: string;
      /**
       * The period for which the controlled load rate applies. Formatted according to [ISO 8601 Durations](https://en.wikipedia.org/wiki/ISO_8601#Durations) (excludes recurrence syntax)
       */
      period: string;
      /**
       * Array of controlled load rates in order of usage volume
       */
      rates: {
        /**
         * Unit price of usage per kWh (exclusive of GST)
         */
        unitPrice: string;
        /**
         * Volume in kWh that this rate applies to.  Only applicable for ‘stepped’ rates where different rates apply for different volumes of usage in a period
         */
        volume?: number | null;
        [k: string]: unknown;
      }[];
      [k: string]: unknown;
    } | null;
    /**
     * Optional list of incentives available for the contract
     */
    incentives?: {
      [k: string]: unknown;
    } | null;
    /**
     * Optional list of discounts available for the contract
     */
    discounts?: {
      [k: string]: unknown;
    } | null;
    /**
     * Optional list of charges applicable to green power
     */
    greenPowerCharges?: {
      [k: string]: unknown;
    } | null;
    /**
     * Eligibility restrictions or requirements
     */
    eligibility?: {
      [k: string]: unknown;
    } | null;
    /**
     * An array of fees applicable to the plan
     */
    fees?: {
      [k: string]: unknown;
    } | null;
    /**
     * Array of feed in tariffs for solar power
     */
    solarFeedInTariff?: {
      [k: string]: unknown;
    } | null;
    /**
     * Array of tariff periods
     */
    tariffPeriod: {
      [k: string]: unknown;
    };
    [k: string]: unknown;
  } & {
    /**
     * The term for the contract.  If absent assumes no specified term
     */
    termType?: ("1_YEAR" | "2_YEAR" | "3_YEAR" | "4_YEAR" | "5_YEAR" | "ONGOING" | "OTHER") | null;
    /**
     * Description of the benefit period.  Should only be present if termType has the value ONGOING
     */
    benefitPeriod?: string | null;
    /**
     * Free text description of the terms for the contract
     */
    terms?: string | null;
    /**
     * An array of the meter types that this contract is available for
     */
    meterTypes?: string[] | null;
    /**
     * Number of days in the cooling off period for the contract.  Mandatory for plans with type of MARKET
     */
    coolingOffDays?: string | null;
    /**
     * An array of the available billing schedules for this contract. Formatted according to [ISO 8601 Durations](https://en.wikipedia.org/wiki/ISO_8601#Durations) (excludes recurrence syntax)
     */
    billFrequency: string[];
    [k: string]: unknown;
  };
  [k: string]: unknown;
};
/**
 * Optional list of discounts available for the contract
 */
 export type EnergyPlanDiscounts = {
  /**
   * The display name of the discount
   */
  displayName: string;
  /**
   * The description of the discount
   */
  description?: string | null;
  /**
   * The type of the discount
   */
  type: "CONDITIONAL" | "GUARANTEED" | "OTHER";
  /**
   * The type of the discount.  Mandatory if the discount type is CONDITIONAL
   */
  category?: ("PAY_ON_TIME" | "DIRECT_DEBIT" | "GUARANTEED_DISCOUNT" | "OTHER") | null;
  /**
   * Optional end date for the discount after which the discount is no longer available
   */
  endDate?: string | null;
  /**
   * The method of calculation of the discount
   */
  methodUType: "percentOfBill" | "percentOfUse" | "fixedAmount" | "percentOverThreshold";
  /**
   * Required if methodUType is percentOfBill
   */
  percentOfBill?: {
    /**
     * The rate of the discount applied to the bill amount
     */
    rate: string;
    [k: string]: unknown;
  } | null;
  /**
   * Required if methodUType is percentOfUse
   */
  percentOfUse?: {
    /**
     * The rate of the discount applied to the usageamount
     */
    rate: string;
    [k: string]: unknown;
  } | null;
  /**
   * Required if methodUType is fixedAmount
   */
  fixedAmount?: {
    /**
     * The amount of the discount
     */
    amount: string;
    [k: string]: unknown;
  } | null;
  /**
   * Required if methodUType is percentOverThreshold
   */
  percentOverThreshold?: {
    /**
     * The rate of the discount over the usage amount
     */
    rate: string;
    /**
     * The usage amount threshold above which the discount applies
     */
    usageAmount: string;
    [k: string]: unknown;
  } | null;
  [k: string]: unknown;
}[];

/**
 * Eligibility restrictions or requirements
 */
 export type EnergyPlanEligibility = {
  /**
   * The type of the eligibility restriction.<br/>The CONTINGENT_PLAN value indicates that the plan is contingent on the customer taking up an alternate fuel plan from the same retailer (for instance, if the fuelType is ELECTRICITY then a GAS plan from the same retailer must be taken up)
   */
  type:
    | "EXISTING_CUST"
    | "EXISTING_POOL"
    | "EXISTING_SOLAR"
    | "EXISTING_BATTERY"
    | "EXISTING_SMART_METER"
    | "EXISTING_BASIC_METER"
    | "SENIOR_CARD"
    | "SMALL_BUSINESS"
    | "NO_SOLAR_FIT"
    | "NEW_CUSTOMER"
    | "ONLINE_ONLY"
    | "REQ_EQUIP_SUPPLIER"
    | "THIRD_PARTY_ONLY"
    | "SPORT_CLUB_MEMBER"
    | "ORG_MEMBER"
    | "SPECIFIC_LOCATION"
    | "MINIMUM_USAGE"
    | "LOYALTY_MEMBER"
    | "GROUP_BUY_MEMBER"
    | "CONTINGENT_PLAN"
    | "OTHER";
  /**
   * Information of the eligibility restriction specific to the type of the restriction
   */
  information: string;
  /**
   * A description of the eligibility restriction
   */
  description?: string | null;
  [k: string]: unknown;
}[];
/**
 * An array of fees applicable to the plan
 */
 export type EnergyPlanFees = {
  /**
   * The type of the fee
   */
  type:
    | "EXIT"
    | "ESTABLISHMENT"
    | "LATE_PAYMENT"
    | "DISCONNECTION"
    | "DISCONNECT_MOVE_OUT"
    | "DISCONNECT_NON_PAY"
    | "RECONNECTION"
    | "CONNECTION"
    | "PAYMENT_PROCESSING"
    | "CC_PROCESSING"
    | "CHEQUE_DISHONOUR"
    | "DD_DISHONOUR"
    | "MEMBERSHIP"
    | "CONTRIBUTION"
    | "PAPER_BILL"
    | "OTHER";
  /**
   * The term of the fee
   */
  term:
    | "FIXED"
    | "1_YEAR"
    | "2_YEAR"
    | "3_YEAR"
    | "4_YEAR"
    | "5_YEAR"
    | "PERCENT_OF_BILL"
    | "ANNUAL"
    | "DAILY"
    | "WEEKLY"
    | "MONTHLY"
    | "BIANNUAL"
    | "VARIABLE";
  /**
   * The fee amount. Required if term is not PERCENT_OF_BILL
   */
  amount?: string | null;
  /**
   * The fee rate. Required if term is PERCENT_OF_BILL
   */
  rate?: string | null;
  /**
   * A description of the fee
   */
  description?: string | null;
  [k: string]: unknown;
}[];

/**
 * Optional list of charges applicable to green power
 */
 export type EnergyPlanGreenPowerCharges = {
  /**
   * The display name of the charge
   */
  displayName: string;
  /**
   * The description of the charge
   */
  description?: string | null;
  /**
   * The applicable green power scheme
   */
  scheme: "GREENPOWER" | "OTHER";
  /**
   * The type of charge
   */
  type:
    | "FIXED_PER_DAY"
    | "FIXED_PER_WEEK"
    | "FIXED_PER_MONTH"
    | "FIXED_PER_UNIT"
    | "PERCENT_OF_USE"
    | "PERCENT_OF_BILL";
  /**
   * Array of charge tiers based on the percentage of green power used for the period implied by the type.  Array is in order of increasing percentage of green power
   */
  tiers: {
    /**
     * The upper percentage of green power used applicable for this tier
     */
    percentGreen: string;
    /**
     * The rate of the charge if the type implies the application of a rate
     */
    rate?: string | null;
    /**
     * The amount of the charge if the type implies the application of a fixed amount
     */
    amount?: string | null;
    [k: string]: unknown;
  }[];
  [k: string]: unknown;
}[];
/**
 * Optional list of incentives available for the contract
 */
 export type EnergyPlanIncentives = {
  /**
   * The display name of the incentive
   */
  displayName: string;
  /**
   * The description of the incentive
   */
  description: string;
  /**
   * The type of the incentive
   */
  category: "GIFT" | "ACCOUNT_CREDIT" | "OTHER";
  /**
   * A display message outlining an eligibility criteria that may apply
   */
  eligibility?: string | null;
  [k: string]: unknown;
}[];

export interface EnergyPlanListResponse {
  data: {
    /**
     * Array of plans
     */
    plans: {
      /**
       * The ID of the specific plan
       */
      planId: string;
      /**
       * The date and time from which this plan is effective (ie. is available for origination). Used to enable the articulation of products to the regime before they are available for customers to originate
       */
      effectiveFrom?: string | null;
      /**
       * The date and time at which this plan will be retired and will no longer be offered. Used to enable the managed deprecation of plans
       */
      effectiveTo?: string | null;
      /**
       * The last date and time that the information for this plan was changed (or the creation date for the plan if it has never been altered)
       */
      lastUpdated: string;
      /**
       * The display name of the plan
       */
      displayName?: string | null;
      /**
       * A description of the plan
       */
      description?: string | null;
      /**
       * The type of the plan
       */
      type: "STANDING" | "MARKET" | "REGULATED";
      /**
       * The fuel types covered by the plan
       */
      fuelType: "ELECTRICITY" | "GAS" | "DUAL";
      /**
       * The ID of the brand under which this plan is offered
       */
      brand: string;
      /**
       * The display name of the brand under which this plan is offered
       */
      brandName: string;
      /**
       * A link to an application web page where this plan can be applied for
       */
      applicationUri?: string | null;
      /**
       * Object that contains links to additional information on specific topics
       */
      additionalInformation?: {
        /**
         * A link to a general overview of the plan
         */
        overviewUri?: string;
        /**
         * A link to terms and conditions for the plan
         */
        termsUri?: string | null;
        /**
         * A link to detail on eligibility criteria for the plan
         */
        eligibilityUri?: string | null;
        /**
         * A link to detail on pricing for the plan
         */
        pricingUri?: string | null;
        /**
         * A link to detail on bundles that this plan can be a part of
         */
        bundleUri?: string | null;
        [k: string]: unknown;
      } | null;
      /**
       * The type of customer that the plan is offered to.  If absent then the plan is available to all customers
       */
      customerType?: ("RESIDENTIAL" | "BUSINESS") | null;
      /**
       * Describes the geographical area that the plan is available for.  If absent then it is assumed the plan is not geographically limited
       */
      geography?: {
        /**
         * Array of valid Australian post codes that are specifically excluded from the plan.  Each element is a single four digit postcode (e.g. 3000) or a range of postcodes defined by two four digit postcodes and a hyphen (e.g. 3000-3999)
         */
        excludedPostcodes?: string[] | null;
        /**
         * Array of valid Australian post codes that are included from the plan.  If absent defaults to all non-excluded post codes.  Each element is a single four digit postcode (e.g. 3000) or a range of postcodes defined by two four digit postcodes and a hyphen (e.g. 3000-3999)
         */
        includedPostcodes?: string[] | null;
        [k: string]: unknown;
      } | null;
      [k: string]: unknown;
    }[];
    [k: string]: unknown;
  };
  links: {
    /**
     * Fully qualified link that generated the current response document
     */
    self: string;
    /**
     * URI to the first page of this set. Mandatory if this response is not the first page
     */
    first?: string | null;
    /**
     * URI to the previous page of this set. Mandatory if this response is not the first page
     */
    prev?: string | null;
    /**
     * URI to the next page of this set. Mandatory if this response is not the last page
     */
    next?: string | null;
    /**
     * URI to the last page of this set. Mandatory if this response is not the last page
     */
    last?: string | null;
    [k: string]: unknown;
  };
  meta: {
    /**
     * The total number of records in the full set. See [pagination](#pagination).
     */
    totalRecords: number;
    /**
     * The total number of pages in the full set. See [pagination](#pagination).
     */
    totalPages: number;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}

export interface EnergyPlanResponse {
  data: {
    /**
     * The ID of the specific plan
     */
    planId: string;
    /**
     * The date and time from which this plan is effective (ie. is available for origination). Used to enable the articulation of products to the regime before they are available for customers to originate
     */
    effectiveFrom?: string | null;
    /**
     * The date and time at which this plan will be retired and will no longer be offered. Used to enable the managed deprecation of plans
     */
    effectiveTo?: string | null;
    /**
     * The last date and time that the information for this plan was changed (or the creation date for the plan if it has never been altered)
     */
    lastUpdated: string;
    /**
     * The display name of the plan
     */
    displayName?: string | null;
    /**
     * A description of the plan
     */
    description?: string | null;
    /**
     * The type of the plan
     */
    type: "STANDING" | "MARKET" | "REGULATED";
    /**
     * The fuel types covered by the plan
     */
    fuelType: "ELECTRICITY" | "GAS" | "DUAL";
    /**
     * The ID of the brand under which this plan is offered
     */
    brand: string;
    /**
     * The display name of the brand under which this plan is offered
     */
    brandName: string;
    /**
     * A link to an application web page where this plan can be applied for
     */
    applicationUri?: string | null;
    /**
     * Object that contains links to additional information on specific topics
     */
    additionalInformation?: {
      /**
       * A link to a general overview of the plan
       */
      overviewUri?: string;
      /**
       * A link to terms and conditions for the plan
       */
      termsUri?: string | null;
      /**
       * A link to detail on eligibility criteria for the plan
       */
      eligibilityUri?: string | null;
      /**
       * A link to detail on pricing for the plan
       */
      pricingUri?: string | null;
      /**
       * A link to detail on bundles that this plan can be a part of
       */
      bundleUri?: string | null;
      [k: string]: unknown;
    } | null;
    /**
     * The type of customer that the plan is offered to.  If absent then the plan is available to all customers
     */
    customerType?: ("RESIDENTIAL" | "BUSINESS") | null;
    /**
     * Describes the geographical area that the plan is available for.  If absent then it is assumed the plan is not geographically limited
     */
    geography?: {
      /**
       * Array of valid Australian post codes that are specifically excluded from the plan.  Each element is a single four digit postcode (e.g. 3000) or a range of postcodes defined by two four digit postcodes and a hyphen (e.g. 3000-3999)
       */
      excludedPostcodes?: string[] | null;
      /**
       * Array of valid Australian post codes that are included from the plan.  If absent defaults to all non-excluded post codes.  Each element is a single four digit postcode (e.g. 3000) or a range of postcodes defined by two four digit postcodes and a hyphen (e.g. 3000-3999)
       */
      includedPostcodes?: string[] | null;
      [k: string]: unknown;
    } | null;
    [k: string]: unknown;
  } & {
    /**
     * Charges for metering included in the plan
     */
    meteringCharges?:
      | {
          /**
           * Display name of the charge
           */
          displayName: string;
          /**
           * Description of the charge
           */
          description?: string | null;
          /**
           * Minimum value of the charge if the charge is a range or the absolute value of the charge if no range is specified
           */
          minimumValue: string;
          /**
           * The upper limit of the charge if the charge could occur in a range
           */
          maximumValue?: string | null;
          /**
           * The charges that occur on a schedule indicates the frequency. Formatted according to [ISO 8601 Durations](https://en.wikipedia.org/wiki/ISO_8601#Durations) (excludes recurrence syntax)
           */
          period?: string | null;
          [k: string]: unknown;
        }[]
      | null;
    /**
     * The details of the terms for the supply of electricity under this plan.  Is mandatory if fuelType is set to GAS or DUAL
     */
    gasContract?: {
      /**
       * Free text field containing additional information of the fees for this contract
       */
      additionalFeeInformation?: string | null;
      /**
       * The pricing model for the contract.  Contracts for gas must use SINGLE_RATE.  Note that the detail for the enumeration values are:<ul><li>**SINGLE_RATE** - all energy usage is charged at a single unit rate no matter when it is consumed. Multiple unit rates may exist that correspond to varying volumes of usage i.e. a ‘block’ or ‘step’ tariff (first 50kWh @ X cents, next 50kWh at Y cents etc.</li><li>**SINGLE_RATE_CONT_LOAD** - as above, but with an additional, separate unit rate charged for all energy usage from a controlled load i.e. separately metered appliance like hot water service, pool pump etc.</li><li>**TIME_OF_USE** - energy usage is charged at unit rates that vary dependent on time of day and day of week that the energy is consumed</li><li>**TIME_OF_USE_CONT_LOAD** - as above, but with an additional, separate unit rate charged for all energy usage from a controlled load i.e. separately metered appliance like hot water service, pool pump etc.</li><li>**FLEXIBLE** - energy usage is charged at unit rates that vary based on external factors</li><li>**FLEXIBLE_CONT_LOAD** - as above, but with an additional, separate unit rate charged for all energy usage from a controlled load i.e. separately metered appliance like hot water service, pool pump etc.</li><li>**QUOTA** - all energy usage is charged at a single fixed rate, up to a specified usage quota/allowance. All excess usage beyond the allowance is then charged at a single unit rate (may not be the best way to explain it but it is essentially a ‘subscription’ or telco style product i.e. $50/month for up to 150kWh included usage</li></ul>
       */
      pricingModel:
        | "SINGLE_RATE"
        | "SINGLE_RATE_CONT_LOAD"
        | "TIME_OF_USE"
        | "TIME_OF_USE_CONT_LOAD"
        | "FLEXIBLE"
        | "FLEXIBLE_CONT_LOAD"
        | "QUOTA";
      /**
       * Required if pricingModel is set to TIME_OF_USE.  Defines the time zone to use for calculation of the time of use thresholds
       */
      timeZone?: ("LOCAL" | "AEST") | null;
      /**
       * Flag indicating whether prices are fixed or variable
       */
      isFixed: boolean;
      /**
       * Free text description of price variation policy and conditions for the contract.  Mandatory if isFixed is true
       */
      variation?: string | null;
      /**
       * Free text field that describes what will occur on or prior to expiry of the fixed contract term or benefit period
       */
      onExpiryDescription?: string | null;
      /**
       * Payment options for this contract
       */
      paymentOption: ("PAPER_BILL" | "CREDIT_CARD" | "DIRECT_DEBIT" | "BPAY" | "OTHER")[];
      /**
       * Describes intrinsic green power for the plan.  If present then the plan includes a percentage of green power in the base plan. Should not be present for gas contracts
       */
      intrinsicGreenPower?: {
        /**
         * Percentage of green power intrinsically included in the plan
         */
        greenPercentage: string;
        [k: string]: unknown;
      } | null;
      /**
       * Required if pricing model is SINGLE_RATE_CONT_LOAD or TIME_OF_USE_CONT_LOAD or FLEXIBLE_CONT_LOAD
       */
      controlledLoad?: {
        /**
         * A display name for the controlled load tier
         */
        displayName: string;
        /**
         * A description of the controlled load tier
         */
        description?: string | null;
        /**
         * The daily supply charge (exclusive of GST) for this controlled load tier
         */
        dailyCharge: string;
        /**
         * The period for which the controlled load rate applies. Formatted according to [ISO 8601 Durations](https://en.wikipedia.org/wiki/ISO_8601#Durations) (excludes recurrence syntax)
         */
        period: string;
        /**
         * Array of controlled load rates in order of usage volume
         */
        rates: {
          /**
           * Unit price of usage per kWh (exclusive of GST)
           */
          unitPrice: string;
          /**
           * Volume in kWh that this rate applies to.  Only applicable for ‘stepped’ rates where different rates apply for different volumes of usage in a period
           */
          volume?: number | null;
          [k: string]: unknown;
        }[];
        [k: string]: unknown;
      } | null;
      /**
       * Optional list of incentives available for the contract
       */
      incentives?: {
        [k: string]: unknown;
      } | null;
      /**
       * Optional list of discounts available for the contract
       */
      discounts?: {
        [k: string]: unknown;
      } | null;
      /**
       * Optional list of charges applicable to green power
       */
      greenPowerCharges?: {
        [k: string]: unknown;
      } | null;
      /**
       * Eligibility restrictions or requirements
       */
      eligibility?: {
        [k: string]: unknown;
      } | null;
      /**
       * An array of fees applicable to the plan
       */
      fees?: {
        [k: string]: unknown;
      } | null;
      /**
       * Array of feed in tariffs for solar power
       */
      solarFeedInTariff?: {
        [k: string]: unknown;
      } | null;
      /**
       * Array of tariff periods
       */
      tariffPeriod: {
        [k: string]: unknown;
      };
      [k: string]: unknown;
    } & {
      /**
       * The term for the contract.  If absent assumes no specified term
       */
      termType?: ("1_YEAR" | "2_YEAR" | "3_YEAR" | "4_YEAR" | "5_YEAR" | "ONGOING" | "OTHER") | null;
      /**
       * Description of the benefit period.  Should only be present if termType has the value ONGOING
       */
      benefitPeriod?: string | null;
      /**
       * Free text description of the terms for the contract
       */
      terms?: string | null;
      /**
       * An array of the meter types that this contract is available for
       */
      meterTypes?: string[] | null;
      /**
       * Number of days in the cooling off period for the contract.  Mandatory for plans with type of MARKET
       */
      coolingOffDays?: string | null;
      /**
       * An array of the available billing schedules for this contract. Formatted according to [ISO 8601 Durations](https://en.wikipedia.org/wiki/ISO_8601#Durations) (excludes recurrence syntax)
       */
      billFrequency: string[];
      [k: string]: unknown;
    };
    /**
     * The details of the terms for the supply of electricity under this plan.  Is mandatory if fuelType is set to ELECTRICITY or DUAL
     */
    electricityContract?: {
      /**
       * Free text field containing additional information of the fees for this contract
       */
      additionalFeeInformation?: string | null;
      /**
       * The pricing model for the contract.  Contracts for gas must use SINGLE_RATE.  Note that the detail for the enumeration values are:<ul><li>**SINGLE_RATE** - all energy usage is charged at a single unit rate no matter when it is consumed. Multiple unit rates may exist that correspond to varying volumes of usage i.e. a ‘block’ or ‘step’ tariff (first 50kWh @ X cents, next 50kWh at Y cents etc.</li><li>**SINGLE_RATE_CONT_LOAD** - as above, but with an additional, separate unit rate charged for all energy usage from a controlled load i.e. separately metered appliance like hot water service, pool pump etc.</li><li>**TIME_OF_USE** - energy usage is charged at unit rates that vary dependent on time of day and day of week that the energy is consumed</li><li>**TIME_OF_USE_CONT_LOAD** - as above, but with an additional, separate unit rate charged for all energy usage from a controlled load i.e. separately metered appliance like hot water service, pool pump etc.</li><li>**FLEXIBLE** - energy usage is charged at unit rates that vary based on external factors</li><li>**FLEXIBLE_CONT_LOAD** - as above, but with an additional, separate unit rate charged for all energy usage from a controlled load i.e. separately metered appliance like hot water service, pool pump etc.</li><li>**QUOTA** - all energy usage is charged at a single fixed rate, up to a specified usage quota/allowance. All excess usage beyond the allowance is then charged at a single unit rate (may not be the best way to explain it but it is essentially a ‘subscription’ or telco style product i.e. $50/month for up to 150kWh included usage</li></ul>
       */
      pricingModel:
        | "SINGLE_RATE"
        | "SINGLE_RATE_CONT_LOAD"
        | "TIME_OF_USE"
        | "TIME_OF_USE_CONT_LOAD"
        | "FLEXIBLE"
        | "FLEXIBLE_CONT_LOAD"
        | "QUOTA";
      /**
       * Required if pricingModel is set to TIME_OF_USE.  Defines the time zone to use for calculation of the time of use thresholds
       */
      timeZone?: ("LOCAL" | "AEST") | null;
      /**
       * Flag indicating whether prices are fixed or variable
       */
      isFixed: boolean;
      /**
       * Free text description of price variation policy and conditions for the contract.  Mandatory if isFixed is true
       */
      variation?: string | null;
      /**
       * Free text field that describes what will occur on or prior to expiry of the fixed contract term or benefit period
       */
      onExpiryDescription?: string | null;
      /**
       * Payment options for this contract
       */
      paymentOption: ("PAPER_BILL" | "CREDIT_CARD" | "DIRECT_DEBIT" | "BPAY" | "OTHER")[];
      /**
       * Describes intrinsic green power for the plan.  If present then the plan includes a percentage of green power in the base plan. Should not be present for gas contracts
       */
      intrinsicGreenPower?: {
        /**
         * Percentage of green power intrinsically included in the plan
         */
        greenPercentage: string;
        [k: string]: unknown;
      } | null;
      /**
       * Required if pricing model is SINGLE_RATE_CONT_LOAD or TIME_OF_USE_CONT_LOAD or FLEXIBLE_CONT_LOAD
       */
      controlledLoad?: {
        /**
         * A display name for the controlled load tier
         */
        displayName: string;
        /**
         * A description of the controlled load tier
         */
        description?: string | null;
        /**
         * The daily supply charge (exclusive of GST) for this controlled load tier
         */
        dailyCharge: string;
        /**
         * The period for which the controlled load rate applies. Formatted according to [ISO 8601 Durations](https://en.wikipedia.org/wiki/ISO_8601#Durations) (excludes recurrence syntax)
         */
        period: string;
        /**
         * Array of controlled load rates in order of usage volume
         */
        rates: {
          /**
           * Unit price of usage per kWh (exclusive of GST)
           */
          unitPrice: string;
          /**
           * Volume in kWh that this rate applies to.  Only applicable for ‘stepped’ rates where different rates apply for different volumes of usage in a period
           */
          volume?: number | null;
          [k: string]: unknown;
        }[];
        [k: string]: unknown;
      } | null;
      /**
       * Optional list of incentives available for the contract
       */
      incentives?: {
        [k: string]: unknown;
      } | null;
      /**
       * Optional list of discounts available for the contract
       */
      discounts?: {
        [k: string]: unknown;
      } | null;
      /**
       * Optional list of charges applicable to green power
       */
      greenPowerCharges?: {
        [k: string]: unknown;
      } | null;
      /**
       * Eligibility restrictions or requirements
       */
      eligibility?: {
        [k: string]: unknown;
      } | null;
      /**
       * An array of fees applicable to the plan
       */
      fees?: {
        [k: string]: unknown;
      } | null;
      /**
       * Array of feed in tariffs for solar power
       */
      solarFeedInTariff?: {
        [k: string]: unknown;
      } | null;
      /**
       * Array of tariff periods
       */
      tariffPeriod: {
        [k: string]: unknown;
      };
      [k: string]: unknown;
    } & {
      /**
       * The term for the contract.  If absent assumes no specified term
       */
      termType?: ("1_YEAR" | "2_YEAR" | "3_YEAR" | "4_YEAR" | "5_YEAR" | "ONGOING" | "OTHER") | null;
      /**
       * Description of the benefit period.  Should only be present if termType has the value ONGOING
       */
      benefitPeriod?: string | null;
      /**
       * Free text description of the terms for the contract
       */
      terms?: string | null;
      /**
       * An array of the meter types that this contract is available for
       */
      meterTypes?: string[] | null;
      /**
       * Number of days in the cooling off period for the contract.  Mandatory for plans with type of MARKET
       */
      coolingOffDays?: string | null;
      /**
       * An array of the available billing schedules for this contract. Formatted according to [ISO 8601 Durations](https://en.wikipedia.org/wiki/ISO_8601#Durations) (excludes recurrence syntax)
       */
      billFrequency: string[];
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  links: {
    /**
     * Fully qualified link that generated the current response document
     */
    self: string;
    [k: string]: unknown;
  };
  meta: {
    [k: string]: unknown;
  };
  [k: string]: unknown;
}

/**
 * Array of feed in tariffs for solar power
 */
 export type EnergyPlanSolarFeedInTariff = {
  /**
   * The name of the tariff
   */
  displayName: string;
  /**
   * A description of the tariff
   */
  description?: string | null;
  /**
   * The applicable scheme
   */
  scheme: "PREMIUM" | "OTHER";
  /**
   * The type of the payer
   */
  payerType: "GOVERNMENT" | "RETAILER";
  /**
   * The type of the payer
   */
  tariffUType: "singleTariff" | "timeVaryingTariffs";
  /**
   * Represents a constant tariff.  Mandatory if tariffUType is set to singleTariff
   */
  singleTariff?: {
    /**
     * The tariff amount
     */
    amount: string;
    [k: string]: unknown;
  } | null;
  /**
   * Represents a tariff based on time.  Mandatory if tariffUType is set to timeVaryingTariffs
   */
  timeVaryingTariffs?: {
    /**
     * The type of the charging time period. If absent applies to all periods
     */
    type?: ("PEAK" | "OFF_PEAK" | "SHOULDER") | null;
    /**
     * The tariff amount
     */
    amount: string;
    /**
     * Array of time periods for which this tariff is applicable
     */
    timeVariations: {
      days?: {
        /**
         * Indicates whether the tariff is applicable Monday to Friday
         */
        weekdays: boolean;
        /**
         * Indicates whether the tariff is applicable Saturday and Sunday
         */
        weekend: boolean;
        [k: string]: unknown;
      };
      /**
       * The beginning of the time period per day for which the tariff applies.  If absent assumes start of day (ie. midnight)
       */
      startTime?: string;
      /**
       * The end of the time period per day for which the tariff applies.  If absent assumes end of day (ie. one second before midnight)
       */
      endTime?: string;
      [k: string]: unknown;
    }[];
    [k: string]: unknown;
  } | null;
  [k: string]: unknown;
}[];

/**
 * Array of tariff periods
 */
 export type EnergyPlanTariffPeriod = {
  /**
   * Type of charge. Assumed to be other if absent
   */
  type?: ("ENVIRONMENTAL" | "REGULATED" | "NETWORK" | "METERING" | "RETAIL_SERVICE" | "RCTI" | "OTHER") | null;
  /**
   * The name of the tariff period
   */
  displayName: string;
  /**
   * The start date of the tariff period in a calendar year.  Formatted in mm-dd format
   */
  startDate: string;
  /**
   * The end date of the tariff period in a calendar year.  Formatted in mm-dd format
   */
  endDate: string;
  /**
   * The amount of access charge for the tariff period, in dollars per day exclusive of GST.
   */
  dailySupplyCharges?: string | null;
  /**
   * Specifies the type of rate applicable to this tariff period
   */
  rateBlockUType: "singleRate" | "timeOfUseRates" | "demandCharges";
  /**
   * Object representing a single rate.  Required if rateBlockUType is singleRate
   */
  singleRate?: {
    /**
     * Display name of the rate
     */
    displayName: string;
    /**
     * Description of the rate
     */
    description?: string | null;
    /**
     * The block rate (unit price) for any usage above the included fixed usage, in dollars per kWh inclusive of GST.  Only required if pricingModel field is ‘QUOTA’
     */
    generalUnitPrice?: string | null;
    /**
     * Array of controlled load rates in order of usage volume
     */
    rates: {
      /**
       * Unit price of usage per measure unit (exclusive of GST)
       */
      unitPrice: string;
      /**
       * The measurement unit of rate. Assumed to be KWH if absent
       */
      measureUnit?: "KWH" | "KVA" | "KVAR" | "KVARH" | "KW" | "DAYS" | "METER" | "MONTH";
      /**
       * Volume in kWh that this rate applies to.  Only applicable for ‘stepped’ rates where different rates apply for different volumes of usage in a period
       */
      volume?: number;
      [k: string]: unknown;
    }[];
    /**
     * Usage period for which the block rate applies. Formatted according to [ISO 8601 Durations](https://en.wikipedia.org/wiki/ISO_8601#Durations) (excludes recurrence syntax)
     */
    period?: string | null;
    [k: string]: unknown;
  } | null;
  /**
   * Array of objects representing time of use rates.  Required if rateBlockUType is timeOfUseRates
   */
  timeOfUseRates?:
    | {
        /**
         * Display name of the rate
         */
        displayName: string;
        /**
         * Description of the rate
         */
        description?: string | null;
        /**
         * Array of controlled load rates in order of usage volume
         */
        rates: {
          /**
           * Unit price of usage per  measure unit (exclusive of GST)
           */
          unitPrice: string;
          /**
           * The measurement unit of rate. Assumed to be KWH if absent
           */
          measureUnit?: "KWH" | "KVA" | "KVAR" | "KVARH" | "KW" | "DAYS" | "METER" | "MONTH";
          /**
           * Volume in kWh that this rate applies to.  Only applicable for ‘stepped’ rates where different rates apply for different volumes of usage in a period
           */
          volume?: number;
          [k: string]: unknown;
        }[];
        /**
         * Array of times of use
         */
        timeOfUse: {
          /**
           * The days that the rate applies to
           */
          days: (
            | "SUNDAY"
            | "MONDAY"
            | "TUESDAY"
            | "WEDNESDAY"
            | "THURSDAY"
            | "FRIDAY"
            | "SATURDAY"
            | "BUSINESS_DAYS"
          )[];
          /**
           * Start of the period in HHMM format using 24 hour clock format
           */
          startTime: string;
          /**
           * End of the period in HHMM format using 24 hour clock format
           */
          endTime: string;
          [k: string]: unknown;
        }[];
        /**
         * The type of usage that the rate applies to
         */
        type: "PEAK" | "OFF_PEAK" | "SHOULDER" | "SHOULDER1" | "SHOULDER2";
        [k: string]: unknown;
      }[]
    | null;
  /**
   * Array of demand charges.  Required if rateBlockUType is demandCharges
   */
  demandCharges?:
    | {
        /**
         * Display name of the charge
         */
        displayName: string;
        /**
         * Description of the charge
         */
        description?: string | null;
        /**
         * The charge amount per  measure unit exclusive of GST
         */
        amount: string;
        /**
         * The measurement unit of charge amount. Assumed to be KWH if absent
         */
        measureUnit?: ("KWH" | "KVA" | "KVAR" | "KVARH" | "KW" | "DAYS" | "METER" | "MONTH") | null;
        /**
         * Start of the period in HHMM format using 24 hour clock format
         */
        startTime: string;
        /**
         * End of the period in HHMM format using 24 hour clock format
         */
        endTime: string;
        /**
         * Object containing demand tariff by day of week
         */
        days?: {
          /**
           * Indicates the demand tariff is applicable on weekdays
           */
          weekdays: boolean;
          /**
           * Indicates the demand tariff is applicable on Saturdays
           */
          saturday: boolean;
          /**
           * Indicates the demand tariff is applicable on Sundays
           */
          sunday: boolean;
          [k: string]: unknown;
        } | null;
        /**
         * Minimum demand for this demand tariff in kW.  If absent then 0 is assumed
         */
        minDemand?: string | null;
        /**
         * Maximum demand for this demand tariff in kW.  If present, must be higher than the value of the minDemand field
         */
        maxDemand?: string | null;
        /**
         * Application period for the demand tariff
         */
        measurementPeriod: "DAY" | "MONTH" | "TARIFF_PERIOD";
        /**
         * Charge period for the demand tariff
         */
        chargePeriod: "DAY" | "MONTH" | "TARIFF_PERIOD";
        [k: string]: unknown;
      }[]
    | null;
  [k: string]: unknown;
}[];

export interface EnergyServicePoint {
  /**
   * Tokenised ID of the service point to be used for referring to the service point in the CDR API suite. To be created in accordance with CDR ID permanence requirements
   */
  servicePointId: string;
  /**
   * The independent ID of the service point, known in the industry as the NMI
   */
  nationalMeteringId: string;
  /**
   * The classification of the service point as defined in MSATS procedures
   */
  servicePointClassification:
    | "EXTERNAL_PROFILE"
    | "GENERATOR"
    | "LARGE"
    | "SMALL"
    | "WHOLESALE"
    | "NON_CONTEST_UNMETERED_LOAD"
    | "NON_REGISTERED_EMBEDDED_GENERATOR"
    | "DISTRIBUTION_WHOLESALE";
  /**
   * Code used to indicate the status of the service point. Note the details for the enumeration values below:<ul><li>**ACTIVE** - An active, energised, service point</li><li>**DE_ENERGISED** - The service point exists but is deenergised</li><li>**EXTINCT** - The service point has been permanently decommissioned</li><li>**GREENFIELD** - Applies to a service point that has never been energised</li><li>**OFF_MARKET** - Applies when the service point is no longer settled in the NEM</li></ul>
   */
  servicePointStatus: "ACTIVE" | "DE_ENERGISED" | "EXTINCT" | "GREENFIELD" | "OFF_MARKET";
  /**
   * Jurisdiction code to which the service point belongs.This code defines the jurisdictional rules which apply to the service point. Note the details of enumeration values below:<ul><li>**ALL** - All Jurisdictions</li><li>**ACT** - Australian Capital Territory</li><li>**NEM** - National Electricity Market</li><li>**NSW** - New South Wales</li><li>**QLD** - Queensland</li><li>**SA** - South Australia</li><li>**TAS** - Tasmania</li><li>**VIC** - Victoria</li></ul>
   */
  jurisdictionCode: "ALL" | "ACT" | "NEM" | "NSW" | "QLD" | "SA" | "TAS" | "VIC";
  /**
   * This flag determines whether the energy at this connection point is to be treated as consumer load or as a generating unit(this may include generator auxiliary loads). If absent defaults to false. <br>**Note:** Only applicable for scheduled or semischeduled generators, does not indicate on site generation by consumer
   */
  isGenerator?: boolean | null;
  /**
   * The start date from which this service point first became valid
   */
  validFromDate: string;
  /**
   * The date and time that the information for this service point was modified
   */
  lastUpdateDateTime: string;
  consumerProfile?: {
    /**
     * A code that defines the consumer class as defined in the National Energy Retail Regulations, or in overriding Jurisdictional instruments
     */
    classification?: "BUSINESS" | "RESIDENTIAL";
    /**
     * A code that defines the consumption threshold as defined in the National Energy Retail Regulations, or in overriding Jurisdictional instruments. Note the details of enumeration values below: <ul><li>**LOW** - Consumption is less than the ‘lower consumption threshold’ as defined in the National Energy Retail Regulations</li><li>**MEDIUM** - Consumption is equal to or greater than the ‘lower consumption threshold’, but less than the ‘upper consumption threshold’, as defined in the National Energy Retail Regulations</li><li>**HIGH** - Consumption is equal to or greater than the ‘upper consumption threshold’ as defined in the National Energy Retail Regulations</li></ul>
     */
    threshold?: "LOW" | "MEDIUM" | "HIGH";
    [k: string]: unknown;
  } | null;
  [k: string]: unknown;
}

export interface EnergyServicePointDetail {
  /**
   * The tokenised ID of the service point for use in the CDR APIs.  Created according to the CDR rules for ID permanence
   */
  servicePointId: string;
  /**
   * The independent ID of the service point, known in the industry as the NMI
   */
  nationalMeteringId: string;
  /**
   * The classification of the service point as defined in MSATS procedures
   */
  servicePointClassification:
    | "EXTERNAL_PROFILE"
    | "GENERATOR"
    | "LARGE"
    | "SMALL"
    | "WHOLESALE"
    | "NON_CONTEST_UNMETERED_LOAD"
    | "NON_REGISTERED_EMBEDDED_GENERATOR"
    | "DISTRIBUTION_WHOLESALE";
  /**
   * Code used to indicate the status of the service point. Note the details for the enumeration values below:<ul><li>**ACTIVE** - An active, energised, service point</li><li>**DE_ENERGISED** - The service point exists but is deenergised</li><li>**EXTINCT** - The service point has been permanently decommissioned</li><li>**GREENFIELD** - Applies to a service point that has never been energised</li><li>**OFF_MARKET** - Applies when the service point is no longer settled in the NEM</li></ul>
   */
  servicePointStatus: "ACTIVE" | "DE_ENERGISED" | "EXTINCT" | "GREENFIELD" | "OFF_MARKET";
  /**
   * Jurisdiction code to which the service point belongs.This code defines the jurisdictional rules which apply to the service point. Note the details of enumeration values below:<ul><li>**ALL** - All Jurisdictions</li><li>**ACT** - Australian Capital Territory</li><li>**NEM** - National Electricity Market</li><li>**NSW** - New South Wales</li><li>**QLD** - Queensland</li><li>**SA** - South Australia</li><li>**TAS** - Tasmania</li><li>**VIC** - Victoria</li></ul>
   */
  jurisdictionCode: "ALL" | "ACT" | "NEM" | "NSW" | "QLD" | "SA" | "TAS" | "VIC";
  /**
   * This flag determines whether the energy at this connection point is to be treated as consumer load or as a generating unit(this may include generator auxiliary loads). If absent defaults to false. <br>**Note:** Only applicable for scheduled or semischeduled generators, does not indicate on site generation by consumer
   */
  isGenerator?: boolean | null;
  /**
   * The start date from which this service point first became valid
   */
  validFromDate: string;
  /**
   * The date and time that the information for this service point was modified
   */
  lastUpdateDateTime: string;
  consumerProfile?: {
    /**
     * A code that defines the consumer class as defined in the National Energy Retail Regulations, or in overriding Jurisdictional instruments
     */
    classification?: "BUSINESS" | "RESIDENTIAL";
    /**
     * A code that defines the consumption threshold as defined in the National Energy Retail Regulations, or in overriding Jurisdictional instruments. Note the details of enumeration values below: <ul><li>**LOW** - Consumption is less than the ‘lower consumption threshold’ as defined in the National Energy Retail Regulations</li><li>**MEDIUM** - Consumption is equal to or greater than the ‘lower consumption threshold’, but less than the ‘upper consumption threshold’, as defined in the National Energy Retail Regulations</li><li>**HIGH** - Consumption is equal to or greater than the ‘upper consumption threshold’ as defined in the National Energy Retail Regulations</li></ul>
     */
    threshold?: "LOW" | "MEDIUM" | "HIGH";
    [k: string]: unknown;
  } | null;
  distributionLossFactor: {
    /**
     * A code used to identify data loss factor for the service point values.  Refer to AEMO distribution loss factor documents for each financial year to interpret
     */
    code: string;
    /**
     * Description of the data loss factor code and value
     */
    description: string;
    /**
     * The value associated with the loss factor code
     */
    lossValue: string;
    [k: string]: unknown;
  };
  relatedParticipants: {
    /**
     * The name of the party/orginsation related to this service point
     */
    party: string;
    /**
     * The role performed by this participant in relation to the service point. Note the details of enumeration values below: <ul><li>**FRMP** - Financially Responsible Market Participant</li><li>**LNSP** - Local Network Service Provider or Embedded Network Manager for child connection points</li><li>**DRSP** - wholesale Demand Response and/or market ancillary Service Provider and note that where it is not relevant for a NMI it will not be included</li></ul>
     */
    role: "FRMP" | "LNSP" | "DRSP";
    [k: string]: unknown;
  }[];
  location: {
    /**
     * The type of address object present
     */
    addressUType: "simple" | "paf";
    /**
     * The address of the service point.  Mandatory if addressUType is set to simple
     */
    simple?: {
      /**
       * Name of the individual or business formatted for inclusion in an address used for physical mail
       */
      mailingName?: string;
      /**
       * First line of the standard address object
       */
      addressLine1: string;
      /**
       * Second line of the standard address object
       */
      addressLine2?: string;
      /**
       * Third line of the standard address object
       */
      addressLine3?: string;
      /**
       * Mandatory for Australian addresses
       */
      postcode?: string;
      /**
       * Name of the city or locality
       */
      city: string;
      /**
       * Free text if the country is not Australia. If country is Australia then must be one of the values defined by the [State Type Abbreviation](https://auspost.com.au/content/dam/auspost_corp/media/documents/australia-post-data-guide.pdf) in the PAF file format. NSW, QLD, VIC, NT, WA, SA, TAS, ACT, AAT
       */
      state: string;
      /**
       * A valid [ISO 3166 Alpha-3](https://www.iso.org/iso-3166-country-codes.html) country code. Australia (AUS) is assumed if country is not present.
       */
      country?: string;
      [k: string]: unknown;
    };
    /**
     * The address of the service point.  Mandatory if addressUType is set to paf. Formatted according to the file format defined by the [PAF file format](https://auspost.com.au/content/dam/auspost_corp/media/documents/australia-post-data-guide.pdf)
     */
    paf?: {
      /**
       * Unique identifier for an address as defined by Australia Post.  Also known as Delivery Point Identifier
       */
      dpid?: string;
      /**
       * Thoroughfare number for a property (first number in a property ranged address)
       */
      thoroughfareNumber1?: number;
      /**
       * Suffix for the thoroughfare number. Only relevant is thoroughfareNumber1 is populated
       */
      thoroughfareNumber1Suffix?: string;
      /**
       * Second thoroughfare number (only used if the property has a ranged address eg 23-25)
       */
      thoroughfareNumber2?: number;
      /**
       * Suffix for the second thoroughfare number. Only relevant is thoroughfareNumber2 is populated
       */
      thoroughfareNumber2Suffix?: string;
      /**
       * Type of flat or unit for the address
       */
      flatUnitType?: string;
      /**
       * Unit number (including suffix, if applicable)
       */
      flatUnitNumber?: string;
      /**
       * Type of floor or level for the address
       */
      floorLevelType?: string;
      /**
       * Floor or level number (including alpha characters)
       */
      floorLevelNumber?: string;
      /**
       * Allotment number for the address
       */
      lotNumber?: string;
      /**
       * Building/Property name 1
       */
      buildingName1?: string;
      /**
       * Building/Property name 2
       */
      buildingName2?: string;
      /**
       * The name of the street
       */
      streetName?: string;
      /**
       * The street type. Valid enumeration defined by Australia Post PAF code file
       */
      streetType?: string;
      /**
       * The street type suffix. Valid enumeration defined by Australia Post PAF code file
       */
      streetSuffix?: string;
      /**
       * Postal delivery type. (eg. PO BOX). Valid enumeration defined by Australia Post PAF code file
       */
      postalDeliveryType?: string;
      /**
       * Postal delivery number if the address is a postal delivery type
       */
      postalDeliveryNumber?: number;
      /**
       * Postal delivery number prefix related to the postal delivery number
       */
      postalDeliveryNumberPrefix?: string;
      /**
       * Postal delivery number suffix related to the postal delivery number
       */
      postalDeliveryNumberSuffix?: string;
      /**
       * Full name of locality
       */
      localityName: string;
      /**
       * Postcode for the locality
       */
      postcode: string;
      /**
       * State in which the address belongs. Valid enumeration defined by Australia Post PAF code file [State Type Abbreviation](https://auspost.com.au/content/dam/auspost_corp/media/documents/australia-post-data-guide.pdf). NSW, QLD, VIC, NT, WA, SA, TAS, ACT, AAT
       */
      state: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  meters: {
    /**
     * The meter ID uniquely identifies a meter for a given service point.  It is unique in the context of the service point.  It is not globally unique
     */
    meterId: string;
    /**
     * Technical characteristics of the meter
     */
    specifications: {
      /**
       * A code to denote the status of the meter. Note the details of enumeration values below: <ul><li>**CURRENT** -Applies when a meter is current and not disconnected</li><li>**DISCONNECTED** - Applies when a meter is present but has been remotely disconnected</li></ul>
       */
      status: "CURRENT" | "DISCONNECTED";
      /**
       * The metering Installation type code indicates whether the metering installation has to be manually read. Note the details of enumeration values below: <ul><li>**BASIC** - Accumulation Meter – Type 6</li><li>**COMMS1** - Interval Meter with communications – Type 1</li><li>**COMMS2** - Interval Meter with communications – Type 2</li><li>**COMMS3** - Interval Meter with communications – Type 3</li><li>**COMMS4** - Interval Meter with communications – Type 4</li><li>**COMMS4C** - CT connected metering installation that meets the minimum services specifications</li><li>**COMMS4D** - Whole current metering installation that meets the minimum services specifications</li><li>**MRAM** - Small customer metering installation – Type 4A</li><li>**MRIM** - Manually Read Interval Meter – Type 5</li><li>**UMCP** - Unmetered Supply – Type 7</li><li>**VICAMI** - A relevant metering installation as defined in clause 9.9C of the NER</li><li>**NCONUML** - Non-contestable unmeter load - Introduced as part of Global Settlement</li></ul>
       */
      installationType:
        | "BASIC"
        | "COMMS1"
        | "COMMS2"
        | "COMMS3"
        | "COMMS4"
        | "COMMS4C"
        | "COMMS4D"
        | "MRAM"
        | "MRIM"
        | "PROF"
        | "SAMPLE"
        | "UMCP"
        | "VICAMI"
        | "NCOLNUML";
      /**
       * Free text field to identify the manufacturer of the installed meter
       */
      manufacturer?: string;
      /**
       * Free text field to identify the meter manufacturer’s designation for the meter model
       */
      model?: string;
      /**
       * Code to denote the method and frequency of Meter Reading. The value is formatted as follows: <ul><li>First Character = Remote (R) or Manual (M)</li><li>Second Character = Mode: T = telephone W = wireless P = powerline I = infra-red G = galvanic V = visual </li><li>Third Character = Frequency of Scheduled Meter Readings: 1 = Twelve times per year 2 = Six times per year 3 = Four times per year D = Daily or weekly</li><li>Optional Fourth Character = to identify what interval length the meter is capable of reading. This includes five, 15 and 30 minute granularity as the following: A – 5 minute B – 15 minute C – 30 minute D – Cannot convert to 5 minute (i.e. due to metering installation de-energised) M - Manually Read Accumulation Meter</li></ul> For example, <ul><li>MV3 = Manual, Visual, Quarterly</li> <li>MV3M = Manual, Visual, Quarterly, Manually Read Accumulation Meter</li> <li>RWDC = Remote, Wireless, Daily, 30 minutes interval</li></ul>
       */
      readType?: string;
      /**
       * This date is the next scheduled meter read date (NSRD) if a manual Meter Reading is required
       */
      nextScheduledReadDate?: string;
      [k: string]: unknown;
    };
    /**
     * Usage data registers available from the meter
     */
    registers: {
      /**
       * Unique identifier of the register within this service point.  Is not globally unique
       */
      registerId: string;
      /**
       * Register suffix of the meter register where the meter reads are obtained
       */
      registerSuffix: string;
      /**
       * The energy delivered through a connection point or metering point over an extended period normalised to a 'per day' basis (kWh). This value is calculated annually.
       */
      averagedDailyLoad?: number;
      /**
       * Indicates the consumption type of register
       */
      registerConsumptionType:
        | "INTERVAL"
        | "BASIC"
        | "PROFILE_DATA"
        | "ACTIVE_IMPORT"
        | "ACTIVE"
        | "REACTIVE_IMPORT"
        | "REACTIVE";
      /**
       * The Network Tariff Code is a free text field containing a code supplied and published by the local network service provider
       */
      networkTariffCode?: string;
      /**
       * The unit of measure for data held in this register
       */
      unitOfMeasure?: string;
      /**
       * Code to identify the time validity of register contents
       */
      timeOfDay?:
        | "ALLDAY"
        | "INTERVAL"
        | "PEAK"
        | "BUSINESS"
        | "SHOULDER"
        | "EVENING"
        | "OFFPEAK"
        | "CONTROLLED"
        | "DEMAND";
      /**
       * Multiplier required to take a register value and turn it into a value representing billable energy
       */
      multiplier?: number;
      /**
       * Indicates whether the energy recorded by this register is created under a Controlled Load regime. ControlledLoad field will have 'No' if register does not relate to a Controlled Load.  If the register relates to a Controlled Load, it should contain a description of the Controlled Load regime. ControlledLoad field will have 'No' if register does not relate to a Controlled Load, “Yes” if register relates to a Controlled Load If absent the status is unknown.
       */
      controlledLoad?: boolean;
      /**
       * Actual/Subtractive Indicator. Note the details of enumeration values below: <ul><li>**ACTUAL** implies volume of energy actually metered between two dates</li><li>**CUMULATIVE** indicates a meter reading for a specific date. A second Meter Reading is required to determine the consumption between those two Meter Reading dates</li></ul>
       */
      consumptionType?: "ACTUAL" | "CUMULATIVE";
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  [k: string]: unknown;
}

export interface EnergyServicePointDetailResponse {
  data: {
    /**
     * The tokenised ID of the service point for use in the CDR APIs.  Created according to the CDR rules for ID permanence
     */
    servicePointId: string;
    /**
     * The independent ID of the service point, known in the industry as the NMI
     */
    nationalMeteringId: string;
    /**
     * The classification of the service point as defined in MSATS procedures
     */
    servicePointClassification:
      | "EXTERNAL_PROFILE"
      | "GENERATOR"
      | "LARGE"
      | "SMALL"
      | "WHOLESALE"
      | "NON_CONTEST_UNMETERED_LOAD"
      | "NON_REGISTERED_EMBEDDED_GENERATOR"
      | "DISTRIBUTION_WHOLESALE";
    /**
     * Code used to indicate the status of the service point. Note the details for the enumeration values below:<ul><li>**ACTIVE** - An active, energised, service point</li><li>**DE_ENERGISED** - The service point exists but is deenergised</li><li>**EXTINCT** - The service point has been permanently decommissioned</li><li>**GREENFIELD** - Applies to a service point that has never been energised</li><li>**OFF_MARKET** - Applies when the service point is no longer settled in the NEM</li></ul>
     */
    servicePointStatus: "ACTIVE" | "DE_ENERGISED" | "EXTINCT" | "GREENFIELD" | "OFF_MARKET";
    /**
     * Jurisdiction code to which the service point belongs.This code defines the jurisdictional rules which apply to the service point. Note the details of enumeration values below:<ul><li>**ALL** - All Jurisdictions</li><li>**ACT** - Australian Capital Territory</li><li>**NEM** - National Electricity Market</li><li>**NSW** - New South Wales</li><li>**QLD** - Queensland</li><li>**SA** - South Australia</li><li>**TAS** - Tasmania</li><li>**VIC** - Victoria</li></ul>
     */
    jurisdictionCode: "ALL" | "ACT" | "NEM" | "NSW" | "QLD" | "SA" | "TAS" | "VIC";
    /**
     * This flag determines whether the energy at this connection point is to be treated as consumer load or as a generating unit(this may include generator auxiliary loads). If absent defaults to false. <br>**Note:** Only applicable for scheduled or semischeduled generators, does not indicate on site generation by consumer
     */
    isGenerator?: boolean | null;
    /**
     * The start date from which this service point first became valid
     */
    validFromDate: string;
    /**
     * The date and time that the information for this service point was modified
     */
    lastUpdateDateTime: string;
    consumerProfile?: {
      /**
       * A code that defines the consumer class as defined in the National Energy Retail Regulations, or in overriding Jurisdictional instruments
       */
      classification?: "BUSINESS" | "RESIDENTIAL";
      /**
       * A code that defines the consumption threshold as defined in the National Energy Retail Regulations, or in overriding Jurisdictional instruments. Note the details of enumeration values below: <ul><li>**LOW** - Consumption is less than the ‘lower consumption threshold’ as defined in the National Energy Retail Regulations</li><li>**MEDIUM** - Consumption is equal to or greater than the ‘lower consumption threshold’, but less than the ‘upper consumption threshold’, as defined in the National Energy Retail Regulations</li><li>**HIGH** - Consumption is equal to or greater than the ‘upper consumption threshold’ as defined in the National Energy Retail Regulations</li></ul>
       */
      threshold?: "LOW" | "MEDIUM" | "HIGH";
      [k: string]: unknown;
    } | null;
    distributionLossFactor: {
      /**
       * A code used to identify data loss factor for the service point values.  Refer to AEMO distribution loss factor documents for each financial year to interpret
       */
      code: string;
      /**
       * Description of the data loss factor code and value
       */
      description: string;
      /**
       * The value associated with the loss factor code
       */
      lossValue: string;
      [k: string]: unknown;
    };
    relatedParticipants: {
      /**
       * The name of the party/orginsation related to this service point
       */
      party: string;
      /**
       * The role performed by this participant in relation to the service point. Note the details of enumeration values below: <ul><li>**FRMP** - Financially Responsible Market Participant</li><li>**LNSP** - Local Network Service Provider or Embedded Network Manager for child connection points</li><li>**DRSP** - wholesale Demand Response and/or market ancillary Service Provider and note that where it is not relevant for a NMI it will not be included</li></ul>
       */
      role: "FRMP" | "LNSP" | "DRSP";
      [k: string]: unknown;
    }[];
    location: {
      /**
       * The type of address object present
       */
      addressUType: "simple" | "paf";
      /**
       * The address of the service point.  Mandatory if addressUType is set to simple
       */
      simple?: {
        /**
         * Name of the individual or business formatted for inclusion in an address used for physical mail
         */
        mailingName?: string;
        /**
         * First line of the standard address object
         */
        addressLine1: string;
        /**
         * Second line of the standard address object
         */
        addressLine2?: string;
        /**
         * Third line of the standard address object
         */
        addressLine3?: string;
        /**
         * Mandatory for Australian addresses
         */
        postcode?: string;
        /**
         * Name of the city or locality
         */
        city: string;
        /**
         * Free text if the country is not Australia. If country is Australia then must be one of the values defined by the [State Type Abbreviation](https://auspost.com.au/content/dam/auspost_corp/media/documents/australia-post-data-guide.pdf) in the PAF file format. NSW, QLD, VIC, NT, WA, SA, TAS, ACT, AAT
         */
        state: string;
        /**
         * A valid [ISO 3166 Alpha-3](https://www.iso.org/iso-3166-country-codes.html) country code. Australia (AUS) is assumed if country is not present.
         */
        country?: string;
        [k: string]: unknown;
      };
      /**
       * The address of the service point.  Mandatory if addressUType is set to paf. Formatted according to the file format defined by the [PAF file format](https://auspost.com.au/content/dam/auspost_corp/media/documents/australia-post-data-guide.pdf)
       */
      paf?: {
        /**
         * Unique identifier for an address as defined by Australia Post.  Also known as Delivery Point Identifier
         */
        dpid?: string;
        /**
         * Thoroughfare number for a property (first number in a property ranged address)
         */
        thoroughfareNumber1?: number;
        /**
         * Suffix for the thoroughfare number. Only relevant is thoroughfareNumber1 is populated
         */
        thoroughfareNumber1Suffix?: string;
        /**
         * Second thoroughfare number (only used if the property has a ranged address eg 23-25)
         */
        thoroughfareNumber2?: number;
        /**
         * Suffix for the second thoroughfare number. Only relevant is thoroughfareNumber2 is populated
         */
        thoroughfareNumber2Suffix?: string;
        /**
         * Type of flat or unit for the address
         */
        flatUnitType?: string;
        /**
         * Unit number (including suffix, if applicable)
         */
        flatUnitNumber?: string;
        /**
         * Type of floor or level for the address
         */
        floorLevelType?: string;
        /**
         * Floor or level number (including alpha characters)
         */
        floorLevelNumber?: string;
        /**
         * Allotment number for the address
         */
        lotNumber?: string;
        /**
         * Building/Property name 1
         */
        buildingName1?: string;
        /**
         * Building/Property name 2
         */
        buildingName2?: string;
        /**
         * The name of the street
         */
        streetName?: string;
        /**
         * The street type. Valid enumeration defined by Australia Post PAF code file
         */
        streetType?: string;
        /**
         * The street type suffix. Valid enumeration defined by Australia Post PAF code file
         */
        streetSuffix?: string;
        /**
         * Postal delivery type. (eg. PO BOX). Valid enumeration defined by Australia Post PAF code file
         */
        postalDeliveryType?: string;
        /**
         * Postal delivery number if the address is a postal delivery type
         */
        postalDeliveryNumber?: number;
        /**
         * Postal delivery number prefix related to the postal delivery number
         */
        postalDeliveryNumberPrefix?: string;
        /**
         * Postal delivery number suffix related to the postal delivery number
         */
        postalDeliveryNumberSuffix?: string;
        /**
         * Full name of locality
         */
        localityName: string;
        /**
         * Postcode for the locality
         */
        postcode: string;
        /**
         * State in which the address belongs. Valid enumeration defined by Australia Post PAF code file [State Type Abbreviation](https://auspost.com.au/content/dam/auspost_corp/media/documents/australia-post-data-guide.pdf). NSW, QLD, VIC, NT, WA, SA, TAS, ACT, AAT
         */
        state: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    meters: {
      /**
       * The meter ID uniquely identifies a meter for a given service point.  It is unique in the context of the service point.  It is not globally unique
       */
      meterId: string;
      /**
       * Technical characteristics of the meter
       */
      specifications: {
        /**
         * A code to denote the status of the meter. Note the details of enumeration values below: <ul><li>**CURRENT** -Applies when a meter is current and not disconnected</li><li>**DISCONNECTED** - Applies when a meter is present but has been remotely disconnected</li></ul>
         */
        status: "CURRENT" | "DISCONNECTED";
        /**
         * The metering Installation type code indicates whether the metering installation has to be manually read. Note the details of enumeration values below: <ul><li>**BASIC** - Accumulation Meter – Type 6</li><li>**COMMS1** - Interval Meter with communications – Type 1</li><li>**COMMS2** - Interval Meter with communications – Type 2</li><li>**COMMS3** - Interval Meter with communications – Type 3</li><li>**COMMS4** - Interval Meter with communications – Type 4</li><li>**COMMS4C** - CT connected metering installation that meets the minimum services specifications</li><li>**COMMS4D** - Whole current metering installation that meets the minimum services specifications</li><li>**MRAM** - Small customer metering installation – Type 4A</li><li>**MRIM** - Manually Read Interval Meter – Type 5</li><li>**UMCP** - Unmetered Supply – Type 7</li><li>**VICAMI** - A relevant metering installation as defined in clause 9.9C of the NER</li><li>**NCONUML** - Non-contestable unmeter load - Introduced as part of Global Settlement</li></ul>
         */
        installationType:
          | "BASIC"
          | "COMMS1"
          | "COMMS2"
          | "COMMS3"
          | "COMMS4"
          | "COMMS4C"
          | "COMMS4D"
          | "MRAM"
          | "MRIM"
          | "PROF"
          | "SAMPLE"
          | "UMCP"
          | "VICAMI"
          | "NCOLNUML";
        /**
         * Free text field to identify the manufacturer of the installed meter
         */
        manufacturer?: string;
        /**
         * Free text field to identify the meter manufacturer’s designation for the meter model
         */
        model?: string;
        /**
         * Code to denote the method and frequency of Meter Reading. The value is formatted as follows: <ul><li>First Character = Remote (R) or Manual (M)</li><li>Second Character = Mode: T = telephone W = wireless P = powerline I = infra-red G = galvanic V = visual </li><li>Third Character = Frequency of Scheduled Meter Readings: 1 = Twelve times per year 2 = Six times per year 3 = Four times per year D = Daily or weekly</li><li>Optional Fourth Character = to identify what interval length the meter is capable of reading. This includes five, 15 and 30 minute granularity as the following: A – 5 minute B – 15 minute C – 30 minute D – Cannot convert to 5 minute (i.e. due to metering installation de-energised) M - Manually Read Accumulation Meter</li></ul> For example, <ul><li>MV3 = Manual, Visual, Quarterly</li> <li>MV3M = Manual, Visual, Quarterly, Manually Read Accumulation Meter</li> <li>RWDC = Remote, Wireless, Daily, 30 minutes interval</li></ul>
         */
        readType?: string;
        /**
         * This date is the next scheduled meter read date (NSRD) if a manual Meter Reading is required
         */
        nextScheduledReadDate?: string;
        [k: string]: unknown;
      };
      /**
       * Usage data registers available from the meter
       */
      registers: {
        /**
         * Unique identifier of the register within this service point.  Is not globally unique
         */
        registerId: string;
        /**
         * Register suffix of the meter register where the meter reads are obtained
         */
        registerSuffix: string;
        /**
         * The energy delivered through a connection point or metering point over an extended period normalised to a 'per day' basis (kWh). This value is calculated annually.
         */
        averagedDailyLoad?: number;
        /**
         * Indicates the consumption type of register
         */
        registerConsumptionType:
          | "INTERVAL"
          | "BASIC"
          | "PROFILE_DATA"
          | "ACTIVE_IMPORT"
          | "ACTIVE"
          | "REACTIVE_IMPORT"
          | "REACTIVE";
        /**
         * The Network Tariff Code is a free text field containing a code supplied and published by the local network service provider
         */
        networkTariffCode?: string;
        /**
         * The unit of measure for data held in this register
         */
        unitOfMeasure?: string;
        /**
         * Code to identify the time validity of register contents
         */
        timeOfDay?:
          | "ALLDAY"
          | "INTERVAL"
          | "PEAK"
          | "BUSINESS"
          | "SHOULDER"
          | "EVENING"
          | "OFFPEAK"
          | "CONTROLLED"
          | "DEMAND";
        /**
         * Multiplier required to take a register value and turn it into a value representing billable energy
         */
        multiplier?: number;
        /**
         * Indicates whether the energy recorded by this register is created under a Controlled Load regime. ControlledLoad field will have 'No' if register does not relate to a Controlled Load.  If the register relates to a Controlled Load, it should contain a description of the Controlled Load regime. ControlledLoad field will have 'No' if register does not relate to a Controlled Load, “Yes” if register relates to a Controlled Load If absent the status is unknown.
         */
        controlledLoad?: boolean;
        /**
         * Actual/Subtractive Indicator. Note the details of enumeration values below: <ul><li>**ACTUAL** implies volume of energy actually metered between two dates</li><li>**CUMULATIVE** indicates a meter reading for a specific date. A second Meter Reading is required to determine the consumption between those two Meter Reading dates</li></ul>
         */
        consumptionType?: "ACTUAL" | "CUMULATIVE";
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  links: {
    /**
     * Fully qualified link that generated the current response document
     */
    self: string;
    [k: string]: unknown;
  };
  meta: {
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
export interface EnergyServicePointListResponse {
  data: {
    servicePoints: {
      /**
       * Tokenised ID of the service point to be used for referring to the service point in the CDR API suite. To be created in accordance with CDR ID permanence requirements
       */
      servicePointId: string;
      /**
       * The independent ID of the service point, known in the industry as the NMI
       */
      nationalMeteringId: string;
      /**
       * The classification of the service point as defined in MSATS procedures
       */
      servicePointClassification:
        | "EXTERNAL_PROFILE"
        | "GENERATOR"
        | "LARGE"
        | "SMALL"
        | "WHOLESALE"
        | "NON_CONTEST_UNMETERED_LOAD"
        | "NON_REGISTERED_EMBEDDED_GENERATOR"
        | "DISTRIBUTION_WHOLESALE";
      /**
       * Code used to indicate the status of the service point. Note the details for the enumeration values below:<ul><li>**ACTIVE** - An active, energised, service point</li><li>**DE_ENERGISED** - The service point exists but is deenergised</li><li>**EXTINCT** - The service point has been permanently decommissioned</li><li>**GREENFIELD** - Applies to a service point that has never been energised</li><li>**OFF_MARKET** - Applies when the service point is no longer settled in the NEM</li></ul>
       */
      servicePointStatus: "ACTIVE" | "DE_ENERGISED" | "EXTINCT" | "GREENFIELD" | "OFF_MARKET";
      /**
       * Jurisdiction code to which the service point belongs.This code defines the jurisdictional rules which apply to the service point. Note the details of enumeration values below:<ul><li>**ALL** - All Jurisdictions</li><li>**ACT** - Australian Capital Territory</li><li>**NEM** - National Electricity Market</li><li>**NSW** - New South Wales</li><li>**QLD** - Queensland</li><li>**SA** - South Australia</li><li>**TAS** - Tasmania</li><li>**VIC** - Victoria</li></ul>
       */
      jurisdictionCode: "ALL" | "ACT" | "NEM" | "NSW" | "QLD" | "SA" | "TAS" | "VIC";
      /**
       * This flag determines whether the energy at this connection point is to be treated as consumer load or as a generating unit(this may include generator auxiliary loads). If absent defaults to false. <br>**Note:** Only applicable for scheduled or semischeduled generators, does not indicate on site generation by consumer
       */
      isGenerator?: boolean | null;
      /**
       * The start date from which this service point first became valid
       */
      validFromDate: string;
      /**
       * The date and time that the information for this service point was modified
       */
      lastUpdateDateTime: string;
      consumerProfile?: {
        /**
         * A code that defines the consumer class as defined in the National Energy Retail Regulations, or in overriding Jurisdictional instruments
         */
        classification?: "BUSINESS" | "RESIDENTIAL";
        /**
         * A code that defines the consumption threshold as defined in the National Energy Retail Regulations, or in overriding Jurisdictional instruments. Note the details of enumeration values below: <ul><li>**LOW** - Consumption is less than the ‘lower consumption threshold’ as defined in the National Energy Retail Regulations</li><li>**MEDIUM** - Consumption is equal to or greater than the ‘lower consumption threshold’, but less than the ‘upper consumption threshold’, as defined in the National Energy Retail Regulations</li><li>**HIGH** - Consumption is equal to or greater than the ‘upper consumption threshold’ as defined in the National Energy Retail Regulations</li></ul>
         */
        threshold?: "LOW" | "MEDIUM" | "HIGH";
        [k: string]: unknown;
      } | null;
      [k: string]: unknown;
    }[];
    [k: string]: unknown;
  };
  links: {
    /**
     * Fully qualified link that generated the current response document
     */
    self: string;
    /**
     * URI to the first page of this set. Mandatory if this response is not the first page
     */
    first?: string | null;
    /**
     * URI to the previous page of this set. Mandatory if this response is not the first page
     */
    prev?: string | null;
    /**
     * URI to the next page of this set. Mandatory if this response is not the last page
     */
    next?: string | null;
    /**
     * URI to the last page of this set. Mandatory if this response is not the last page
     */
    last?: string | null;
    [k: string]: unknown;
  };
  meta: {
    /**
     * The total number of records in the full set. See [pagination](#pagination).
     */
    totalRecords: number;
    /**
     * The total number of pages in the full set. See [pagination](#pagination).
     */
    totalPages: number;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}

export interface EnergyUsageListResponse {
  data: {
    /**
     * Array of meter reads
     */
    reads: {
      /**
       * Tokenised ID of the service point to be used for referring to the service point in the CDR API suite.  To be created in accordance with CDR ID permanence requirements
       */
      servicePointId: string;
      /**
       * Register ID of the meter register where the meter reads are obtained
       */
      registerId?: string | null;
      /**
       * Register suffix of the meter register where the meter reads are obtained
       */
      registerSuffix: string;
      /**
       * Meter id/serial number as it appears in customer’s bill. ID permanence rules do not apply.
       */
      meterID?: string | null;
      /**
       * Indicates whether the energy recorded by this register is created under a Controlled Load regime. ControlledLoad field will have 'No if register does not relate to a Controlled Load, “Yes” if register relates to a Controlled Load If absent the status is unknown.
       */
      controlledLoad?: boolean | null;
      /**
       * Date time when the meter reads start
       */
      readStartDate: string;
      /**
       * Date time when the meter reads end.  If absent then assumed to be equal to readStartDate.  In this case the entry represents data for a single date specified by readStartDate
       */
      readEndDate?: string | null;
      /**
       * Unit of measure of the meter reads. Refer to Appendix B of <a href='https://www.aemo.com.au/-/media/files/stakeholder_consultation/consultations/nem-consultations/2019/5ms-metering-package-2/final-determination/mdff-specification-nem12-nem13-v21-final-determination-clean.pdf?la=en&hash=03FCBA0D60E091DE00F2361AE76206EA'>MDFF Specification NEM12 NEM13 v2.1</a> for a list of possible values
       */
      unitOfMeasure?: string | null;
      /**
       * Specify the type of the meter read data
       */
      readUType: "basicRead" | "intervalRead";
      /**
       * Mandatory if readUType is set to basicRead
       */
      basicRead?: {
        /**
         * The quality of the read taken.  If absent then assumed to be ACTUAL
         */
        quality?: ("ACTUAL" | "SUBSTITUTE" | "FINAL_SUBSTITUTE") | null;
        /**
         * Meter read value.  If positive then it means consumption, if negative it means export
         */
        value: number;
        [k: string]: unknown;
      } | null;
      /**
       * Mandatory if readUType is set to intervalRead
       */
      intervalRead?: {
        /**
         * Read interval length in minutes
         */
        readIntervalLength: string;
        /**
         * The aggregate sum of the interval read values. If positive then it means net consumption, if negative it means net export
         */
        aggregateValue: number;
        /**
         * Array of reads with each element indicating the read for the interval specified by readIntervalLength beginning at midnight of readStartDate (for example 00:00 to 00:30 would be the first reading in a 30 minute Interval)
         */
        intervalReads: {
          /**
           * The quality of the read taken.  If absent then assumed to be ACTUAL
           */
          quality?: ("ACTUAL" | "SUBSTITUTE" | "FINAL_SUBSTITUTE") | null;
          /**
           * Interval value.  If positive then it means consumption, if negative it means export
           */
          value: number;
          [k: string]: unknown;
        }[];
        [k: string]: unknown;
      } | null;
      [k: string]: unknown;
    }[];
    [k: string]: unknown;
  };
  links: {
    /**
     * Fully qualified link that generated the current response document
     */
    self: string;
    /**
     * URI to the first page of this set. Mandatory if this response is not the first page
     */
    first?: string | null;
    /**
     * URI to the previous page of this set. Mandatory if this response is not the first page
     */
    prev?: string | null;
    /**
     * URI to the next page of this set. Mandatory if this response is not the last page
     */
    next?: string | null;
    /**
     * URI to the last page of this set. Mandatory if this response is not the last page
     */
    last?: string | null;
    [k: string]: unknown;
  };
  meta: {
    /**
     * The total number of records in the full set. See [pagination](#pagination).
     */
    totalRecords: number;
    /**
     * The total number of pages in the full set. See [pagination](#pagination).
     */
    totalPages: number;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}

export interface EnergyUsageRead {
  /**
   * Tokenised ID of the service point to be used for referring to the service point in the CDR API suite.  To be created in accordance with CDR ID permanence requirements
   */
  servicePointId: string;
  /**
   * Register ID of the meter register where the meter reads are obtained
   */
  registerId?: string | null;
  /**
   * Register suffix of the meter register where the meter reads are obtained
   */
  registerSuffix: string;
  /**
   * Meter id/serial number as it appears in customer’s bill. ID permanence rules do not apply.
   */
  meterID?: string | null;
  /**
   * Indicates whether the energy recorded by this register is created under a Controlled Load regime. ControlledLoad field will have 'No if register does not relate to a Controlled Load, “Yes” if register relates to a Controlled Load If absent the status is unknown.
   */
  controlledLoad?: boolean | null;
  /**
   * Date time when the meter reads start
   */
  readStartDate: string;
  /**
   * Date time when the meter reads end.  If absent then assumed to be equal to readStartDate.  In this case the entry represents data for a single date specified by readStartDate
   */
  readEndDate?: string | null;
  /**
   * Unit of measure of the meter reads. Refer to Appendix B of <a href='https://www.aemo.com.au/-/media/files/stakeholder_consultation/consultations/nem-consultations/2019/5ms-metering-package-2/final-determination/mdff-specification-nem12-nem13-v21-final-determination-clean.pdf?la=en&hash=03FCBA0D60E091DE00F2361AE76206EA'>MDFF Specification NEM12 NEM13 v2.1</a> for a list of possible values
   */
  unitOfMeasure?: string | null;
  /**
   * Specify the type of the meter read data
   */
  readUType: "basicRead" | "intervalRead";
  /**
   * Mandatory if readUType is set to basicRead
   */
  basicRead?: {
    /**
     * The quality of the read taken.  If absent then assumed to be ACTUAL
     */
    quality?: ("ACTUAL" | "SUBSTITUTE" | "FINAL_SUBSTITUTE") | null;
    /**
     * Meter read value.  If positive then it means consumption, if negative it means export
     */
    value: number;
    [k: string]: unknown;
  } | null;
  /**
   * Mandatory if readUType is set to intervalRead
   */
  intervalRead?: {
    /**
     * Read interval length in minutes
     */
    readIntervalLength: string;
    /**
     * The aggregate sum of the interval read values. If positive then it means net consumption, if negative it means net export
     */
    aggregateValue: number;
    /**
     * Array of reads with each element indicating the read for the interval specified by readIntervalLength beginning at midnight of readStartDate (for example 00:00 to 00:30 would be the first reading in a 30 minute Interval)
     */
    intervalReads: {
      /**
       * The quality of the read taken.  If absent then assumed to be ACTUAL
       */
      quality?: ("ACTUAL" | "SUBSTITUTE" | "FINAL_SUBSTITUTE") | null;
      /**
       * Interval value.  If positive then it means consumption, if negative it means export
       */
      value: number;
      [k: string]: unknown;
    }[];
    [k: string]: unknown;
  } | null;
  [k: string]: unknown;
}

export interface ErrorListResponse {
  errors: {
    /**
     * The code of the error encountered. Where the error is specific to the respondent, an application-specific error code, expressed as a string value. If the error is application-specific, the URN code that the specific error extends must be provided in the meta object. Otherwise, the value is the error code URN.
     */
    code: string;
    /**
     * A short, human-readable summary of the problem that MUST NOT change from occurrence to occurrence of the problem represented by the error code.
     */
    title: string;
    /**
     * A human-readable explanation specific to this occurrence of the problem.
     */
    detail: string;
    /**
     * Additional data for customised error codes
     */
    meta?: {
      /**
       * The CDR error code URN which the application-specific error code extends. Mandatory if the error `code` is an application-specific error rather than a standardised error code.
       */
      urn?: string;
      [k: string]: unknown;
    } | null;
    [k: string]: unknown;
  }[];
  [k: string]: unknown;
}
