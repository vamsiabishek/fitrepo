import React, {Component} from 'react';
import {
  Alert,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  BG_COLOR,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  styleCommon,
  fontsCommon,
  DEVICE_NAME,
  ICON_SIZE_MED,
} from '../../assets/style/stylesCommonValues';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

class TermsAndConditions extends Component {
  state = {
    accepted: false,
  };

  render() {
    const {showCloseBtn = true, onCancel, showAcceptBtn} = this.props;
    return (
      // <Modal
      //   useNativeDriver={true}
      //   isVisible={showTermsAndConditions}
      //   backdropColor="black"
      //   backdropOpacity={0.5}
      //   style={styles.modalStyle}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Button
            icon={
              <Icon
                name="arrow-left-thick"
                size={ICON_SIZE_MED}
                color={styleCommon.textColorWhite}
              />
            }
            type="clear"
            containerStyle={styles.headerBtnStyle}
            //containerStyle={styles.backButtonContainerStyle}
            //buttonStyle={styles.backButtonStyle}
            onPress={onCancel}
          />
          {showCloseBtn && (
            <Button
              icon={
                <Icon
                  name="close-circle"
                  size={ICON_SIZE_MED}
                  color={styleCommon.textColorWhite}
                />
              }
              type="clear"
              onPress={onCancel}
              containerStyle={styles.headerBtnStyle}
            />
          )}
        </View>

        <Text style={styles.title}>Terms & Conditions</Text>
        <ScrollView
          style={styles.tcContainer}
          onScroll={({nativeEvent}) => {
            if (isCloseToBottom(nativeEvent)) {
              this.setState({
                accepted: true,
              });
            }
          }}>
          <Text style={styles.tcPH}>AGREEMENT TO TERMS</Text>
          <Text style={styles.tcP}>
            These Terms and Conditions constitute a legally binding agreement
            made between you, whether personally or on behalf of an entity
            (“you”) and DietRepo (“we,” “us” or “our”), concerning your access
            to and use of the [website name.com] website as well as any other
            media form, media channel, mobile website or mobile application
            related, linked, or otherwise connected thereto (collectively, the
            “Site”). You agree that by accessing the Site, you have read,
            understood, and agree to be bound by all of these Terms and
            Conditions Use. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS
            andCONDITIONS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE
            AND YOU MUST DISCONTINUE USE IMMEDIATELY.
          </Text>
          <Text style={styles.tcP}>
            Supplemental terms and conditions or documents that may be posted on
            the Site from time to time are hereby expressly incorporated herein
            by reference. We reserve the right, in our sole discretion, to make
            changes or modifications to these Terms and Conditions at any time
            and for any reason. We will alert you about any changes by updating
            the “Last updated” date of these Terms and Conditions and you waive
            any right to receive specific notice of each such change. It is your
            responsibility to periodically review these Terms and Conditions to
            stay informed of updates. You will be subject to, and will be deemed
            to have been made aware of and to have accepted, the changes in any
            revised Terms and Conditions by your continued use of theSite after
            the date such revised Terms are posted.
          </Text>
          <Text style={styles.tcP}>
            The information provided on the Site is not intended for
            distribution to or use by any person or entity in any jurisdiction
            or country where such distribution or use would be contrary to law
            or regulation or which would subject us to any registration
            requirement with in such jurisdiction or country. Accordingly, those
            persons who choose to access the Site from other locations do so on
            their own initiative and are solely responsible for compliance with
            local laws, if and to the extent local laws are applicable.
          </Text>
          <Text style={styles.tcP}>
            The Site is intended for users who are at least 15 years of age. All
            users who are minors in the jurisdiction in which they reside
            (generally under the age of 18) must have the permission of, and be
            directly supervised by, their parent or guardian to use the Site. If
            you are a minor, you must have your parent or guardian read and
            agree to these Terms of Use prior to you using the Site.
          </Text>
          <Text style={styles.tcPH}>INTELLECTUAL PROPERTY RIGHTS</Text>
          <Text style={styles.tcP}>
            Unless otherwise indicated, the Site is our proprietary property and
            all source code, databases, functionality, software, website
            designs, audio, video, text, photographs, and graphics on the
            Site(collectively, the “Content”) and the trademarks, service marks,
            and logos contained therein (the “Marks”) are owned or controlled by
            us or licensed to us, and are protected by copyright and trademark
            laws and various other intellectual property rights and unfair
            competition laws of the United States, foreign jurisdictions, and
            international conventions. The Content and the Marks are provided on
            the Site “AS IS” for your information and personal use only.Except
            as expressly provided in these Terms of Use, no part of the Site and
            noContent or Marks may be copied, reproduced, aggregated,
            republished, uploaded, posted, publicly displayed, encoded,
            translated, transmitted, distributed, sold, licensed, or otherwise
            exploited for any commercial purpose whatsoever, without our express
            prior written permission.
          </Text>
          <Text style={styles.tcP}>
            Provided that you are eligible to use the Site, you are granted a
            limited license to access and use the Site and to download or print
            a copy of any portion of the Content to which you have properly
            gained access solely for your personal, non-commercial use. We
            reserve all rights not expressly granted to you in and to the Site,
            Content and the Marks.
          </Text>
          <Text style={styles.tcPH}>USER REPRESENTATIONS</Text>
          <Text style={styles.tcP}>
            By using the Site, you represent and warrant that: (1) all
            registration information you submit will be true, accurate, current,
            and complete; (2) you will maintain the accuracy of such information
            and promptly update such registration information as necessary; (3)
            you have the legal capacity and you agree to comply with these Terms
            of Use; (4)you are not under the age of 15; (5) not a minor in the
            jurisdiction in which you reside, or if a minor, you have received
            parental permission to use theSite; (6) you will not access the Site
            through automated or non-human means, whether through a bot, script
            or otherwise; (7) you will not use the Site for any illegal or
            unauthorised purpose; and (8) your use of the Site will not violate
            any applicable law or regulation.
          </Text>
          <Text style={styles.tcP}>
            If you provide any information that is untrue, inaccurate, not
            current, or incomplete, we have the right to suspend or terminate
            your account and refuse any and all current or future use of the
            Site(or any portion thereof).
          </Text>
          <Text style={styles.tcPH}>USER REGISTRATION</Text>
          <Text style={styles.tcP}>
            You may be required to register with the Site.You agree to keep your
            password confidential and will be responsible for all use of your
            account and password. We reserve the right to remove, reclaim, or
            change a username you select if we determine, in our sole
            discretion, that such username is inappropriate, obscene, or
            otherwise objectionable.
          </Text>
          <Text style={styles.tcPH}>PROHIBITED ACTIVITIES</Text>
          <Text style={styles.tcP}>
            You may not access or use the Site for any purpose other than that
            for which we make the Site available. The Site may not be used in
            connection with any commercial endeavours except those that are
            specifically endorsed or approved by us.
          </Text>
          <Text style={styles.tcP}>
            As a user of the Site, you agree not to:
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} systematically retrieve data or other content from the
            Site to create or compile, directly or indirectly, a collection,
            compilation, database, or directory without written permission from
            us.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} make any unauthorised use of the Site, including
            collecting usernames and/or email addresses of users by electronic
            or other means for the purpose of sending unsolicited email, or
            creating user accounts by automated means or under false pretence.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} use a buying agent or purchasing agent to make purchases
            on the Site.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} use the Site to advertise or offer to sell goods and
            services.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} circumvent, disable, or otherwise interfere with
            security-related features of the Site, including features that
            prevent or restrict the use or copying of any Content or enforce
            limitations on the use of the Site and/or the Content contained
            therein.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} engage in unauthorised framing of or linking to the Site.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} trick, defraud, or mislead us and other users, especially
            in any attempt to learn sensitive account information such as user
            passwords;
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} make improper use of our support services or submit false
            reports of abuse or misconduct.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} engage in any automated use of the system, such as using
            scripts to send comments or messages, or using any data mining,
            robots, or similar data gathering and extraction tools.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} interfere with, disrupt, or create an undue burden on the
            Site or the networks or services connected to the Site.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} attempt to impersonate another user or person or use the
            username of another user.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} sell or otherwise transfer your profile.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} use any information obtained from the Site in-order to
            harass, abuse, or harm another person.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} use the Site as part of any effort to compete with us or
            otherwise use the Site and/or the Content for any revenue-generating
            endeavour or commercial enterprise.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} decipher, decompile, disassemble, or reverse engineer any
            of the software comprising or in any way making up a part of
            theSite.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} attempt to bypass any measures of the Site designed to
            prevent or restrict access to the Site, or any portion of the Site.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} harass, annoy, intimidate, or threaten any of our
            employees or agents engaged in providing any portion of the Site to
            you.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} delete the copyright or other proprietary rights notice
            from any Content.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} copy or adapt the Site’s software, including but not
            limited to Flash, PHP, HTML, JavaScript, or other code.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} upload or transmit (or attempt to upload or to transmit)
            viruses, Trojan horses, or other material, including excessive use
            of capital letters and spamming (continuous posting of repetitive
            text), that interferes with any party’s uninterrupted use and
            enjoyment of the Site or modifies, impairs, disrupts, alters, or
            interferes with the use, features, functions, operation, or
            maintenance of the Site.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} upload or transmit (or attempt to upload or to transmit)
            any material that acts as a passive or active information collection
            or transmission mechanism, including without limitation, clear
            graphics interchange formats (“gifs”), 1×1 pixels, web bugs,
            cookies, or other similar devices (sometimes referred to as
            “spyware” or “passive collection mechanisms”or “pcms”).
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} except as may be the result of standard search engine or
            Internet browser usage, use, launch, develop, or distribute any
            automated system, including without limitation, any spider, robot,
            cheat utility, scraper, or offline reader that accesses the Site, or
            using or launching any unauthorized script or other software.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} disparage, tarnish, or otherwise harm, in our opinion, us
            and/or the Site.
          </Text>
          <Text style={styles.tcL}>
            {'\u2022'} use the Site in a manner inconsistent with any applicable
            laws or regulations.
          </Text>
          <Text style={styles.tcPH}>MOBILE APPLICATION LICENSE</Text>
          <Text style={styles.tcPH}>Use License</Text>
          <Text style={styles.tcP}>
            If you access the Site via a mobile application, then we grant you a
            revocable, non-exclusive, non-transferable, limited right to install
            and use the mobile application on wireless electronic devices owned
            or controlled by you, and to access and use the mobile application
            on such devices strictly in accordance with the terms and conditions
            of this mobile application license contained in these Terms of Use.
            You shall not: (1)decompile, reverse engineer, disassemble, attempt
            to derive the source code of, or decrypt the application; (2) make
            any modification, adaptation, improvement, enhancement, translation,
            or derivative work from the application; (3) violate any applicable
            laws, rules, or regulations in connection with your access or use of
            the application; (4) remove, alter, or obscure any proprietary
            notice(including any notice of copyright or trademark) posted by us
            or the licensors of the application; (5) use the application for any
            revenue generating endeavor, commercial enterprise, or other purpose
            for which it is not designed or intended; (6) make the application
            available over a network or other environment permitting access or
            use by multiple devices or users at the same time; (7) use the
            application for creating a product, service, or software that is,
            directly or indirectly, competitive with or in any way a substitute
            for the application; (8) use the application to send automated
            queries to any website or to send any unsolicited commercial e-mail;
            or (9) use any proprietary information or any of our interfaces or
            our other intellectual property in the design, development,
            manufacture, licensing, or distribution of any applications,
            accessories, or devices for use with the application.
          </Text>
          <Text style={styles.tcPH}>Apple and Android Devices</Text>
          <Text style={styles.tcP}>
            The following terms apply when you use a mobile application obtained
            from either the Apple Store or Google Play (each an
            “AppDistributor”) to access the Site: (1) the license granted to you
            for our mobile application is limited to a non-transferable license
            to use the application on a device that utilizes the Apple iOS or
            Android operating systems, as applicable, and in accordance with the
            usage rules set forth in the applicableApp Distributor’s terms of
            service; (2) we are responsible for providing any maintenance and
            support services with respect to the mobile application as specified
            in the terms and conditions of this mobile application license
            contained in these Terms of Use or as otherwise required under
            applicable law, and you acknowledge that each App Distributor has no
            obligation whatsoever to furnish any maintenance and support
            services with respect to the mobile application; (3) in the event of
            any failure of the mobile application to conform to any applicable
            warranty, you may notify the applicable AppDistributor, and the App
            Distributor, in accordance with its terms and policies, may refund
            the purchase price, if any, paid for the mobile application, and to
            the maximum extent permitted by applicable law, the AppDistributor
            will have no other warranty obligation whatsoever with respect to
            the mobile application; (4) you represent and warrant that (i) you
            are not located in a country that is subject to a U.S. government
            embargo, or that has been designated by the U.S. government as a
            “terrorist supporting” country and(ii) you are not listed on any
            U.S. government list of prohibited or restricted parties; (5) you
            must comply with applicable third-party terms of agreement when
            using the mobile application, e.g., if you have a VoIP application,
            then you must not be in violation of their wireless data service
            agreement when using the mobile application; and (6) you acknowledge
            and agree that the AppDistributors are third-party beneficiaries of
            the terms and conditions in this mobile application license
            contained in these Terms of Use, and that each AppDistributor will
            have the right (and will be deemed to have accepted the right)to
            enforce the terms and conditions in this mobile application license
            contained in these Terms of Use against you as a third-party
            beneficiary thereof.
          </Text>
          <Text style={styles.tcPH}>SOCIAL MEDIA</Text>
          <Text style={styles.tcP}>
            As part of the functionality of the Site, you may link your account
            with online accounts you have with third-party service providers
            (each such account, a “Third-Party Account”) by either: (1)
            providing your Third-Party Account login information through the
            Site; or (2) allowing us to access your Third-Party Account, as is
            permitted under the applicable terms and conditions that govern your
            use of each Third-Party Account. You represent and warrant that you
            are entitled to disclose your Third-Party Account login information
            to us and/or grant us access to your Third-Party Account, without
            breach by you of any of the terms and conditions that govern your
            use of the applicable Third-Party Account, and without obligating us
            to pay any fees or making us subject to any usage limitations
            imposed by the third-party service provider of the Third-Party
            Account. By granting us access to any Third-PartyAccounts, you
            understand that (1) we may access, make available, and store (if
            applicable) any content that you have provided to and stored in
            yourThird-Party Account (the “Social Network Content”) so that it is
            available on and through the Site via your account, including
            without limitation any friend lists and (2) we may submit to and
            receive from your Third-Party Account additional information to the
            extent you are notified when you link your account with the
            Third-Party Account. Depending on the Third-Party Accounts you
            choose and subject to the privacy settings that you have set in
            suchThird-Party Accounts, personally identifiable information that
            you post to yourThird-Party Accounts may be available on and through
            your account on the Site.Please note that if a Third-Party Account
            or associated service becomes unavailable or our access to such
            Third-Party Account is terminated by the third-party service
            provider, then Social Network Content may no longer be available on
            and through the Site. You will have the ability to disable the
            connection between your account on the Site and your Third-Party
            Accounts at any time. PLEASE NOTE THAT YOUR RELATIONSHIP WITH THE
            THIRD-PARTY SERVICE PROVIDERS ASSOCIATED WITH YOUR THIRD-PARTY
            ACCOUNTS IS GOVERNED SOLELY BY YOUR AGREEMENT(S) WITH SUCH
            THIRD-PARTY SERVICE PROVIDERS. We make no effort to review any
            Social Network Content for any purpose, including but not limited
            to, for accuracy, legality, or non-infringement, and we are not
            responsible for any Social Network Content. You acknowledge and
            agree that we may access your email address book associated with a
            Third-Party Account and your contacts list stored on your mobile
            device or tablet computer solely for purposes of identifying and
            informing you of those contacts who have also registered to use the
            Site. You can deactivate the connection between the Site and
            yourThird-Party Account by contacting us using the contact
            information below or through your account settings (if applicable).
            We will attempt to delete any information stored on our servers that
            was obtained through such Third-PartyAccount, except the username,
            date of birth(if any) and profile picture that become associated
            with your account.
          </Text>
          <Text style={styles.tcPH}>SUBMISSIONS</Text>
          <Text style={styles.tcP}>
            You acknowledge and agree that any questions, comments, suggestions,
            ideas, feedback, or other information regarding the
            Site("Submissions") provided by you to us are non-confidential and
            shall become our sole property. We shall own exclusive rights,
            including all intellectual property rights, and shall be entitled to
            the unrestricted use and dissemination of these Submissions for any
            lawful purpose, commercial or otherwise, without acknowledgment or
            compensation to you. You hereby waive all moral rights to any such
            Submissions, and you hereby warrant that any suchSubmissions are
            original with you or that you have the right to submit
            suchSubmissions. You agree there shall be no recourse against us for
            any alleged or actual infringement or misappropriation of any
            proprietary right in yourSubmissions.
          </Text>
          <Text style={styles.tcPH}>THIRD-PARTY WEBSITES AND CONTENT</Text>
          <Text style={styles.tcP}>
            The Site may contain (or you may be sent via theSite) links to other
            websites ("Third-Party Websites") as well as articles, photographs,
            text, graphics, pictures, designs, music, sound, video, information,
            applications, software, and other content or items belonging to or
            originating from third parties ("Third-Party Content").
            SuchThird-Party Websites and Third-Party Content are not
            investigated, monitored, or checked for accuracy, appropriateness,
            or completeness by us, and we are not responsible for any
            Third-Party Websites accessed through the Site or anyThird-Party
            Content posted on, available through, or installed from the Site,
            including the content, accuracy, offensiveness, opinions,
            reliability, privacy practices, or other policies of or contained in
            the Third-Party Websites or theThird-Party Content. Inclusion of,
            linking to, or permitting the use or installation of any Third-Party
            Websites or any Third-Party Content does not imply approval or
            endorsement thereof by us. If you decide to leave the Site and
            access the Third-Party Websites or to use or install any
            Third-PartyContent, you do so at your own risk, and you should be
            aware these Terms of Use no longer govern. You should review the
            applicable terms and policies, including privacy and data gathering
            practices, of any website to which you navigate from the Site or
            relating to any applications you use or install from the Site. Any
            purchases you make through Third-Party Websites will be through
            other websites and from other companies, and we take no
            responsibility whatsoever in relation to such purchases which are
            exclusively between you and the applicable third party. You agree
            and acknowledge that we do not endorse the products or services
            offered on Third-Party Websites and you shall hold us harmless from
            any harm caused by your purchase of such products or
            services.Additionally, you shall hold us harmless from any losses
            sustained by you or harm caused to you relating to or resulting in
            any way from any Third-PartyContent or any contact with Third-Party
            Websites.
          </Text>
          <Text style={styles.tcPH}>ADVERTISERS</Text>
          <Text style={styles.tcP}>
            We allow advertisers to display their advertisements and other
            information in certain areas of the Site, such as sidebar
            advertisements or banner advertisements. If you are an advertiser,
            you shall take full responsibility for any advertisements you place
            on the Site and any services provided on the Site or products sold
            through those advertisements.Further, as an advertiser, you warrant
            and represent that you possess all rights and authority to place
            advertisements on the Site, including, but not limited to,
            intellectual property rights, publicity rights, and contractual
            rights. [As an advertiser, you agree that such advertisements are
            subject to our Digital Millennium Copyright Act (“DMCA”) Notice and
            Policy provisions as described below, and you understand and agree
            there will be no refund or other compensation for DMCA
            takedown-related issues.] We simply provide the space to place such
            advertisements, and we have no other relationship with advertisers.
          </Text>
          <Text style={styles.tcPH}>SITE MANAGEMENT</Text>
          <Text style={styles.tcP}>
            We reserve the right, but not the obligation, to: (1) monitor the
            Site for violations of these Terms of Use; (2) take appropriate
            legal action against anyone who, in our sole discretion, violates
            the law or these Terms of Use, including without limitation,
            reporting such user to law enforcement authorities; (3) in our sole
            discretion and without limitation, refuse, restrict access to, limit
            the availability of, or disable(to the extent technologically
            feasible) any of your Contributions or any portion thereof; (4) in
            our sole discretion and without limitation, notice, or liability, to
            remove from the Site or otherwise disable all files and content that
            are excessive in size or are in any way burdensome to our systems;
            and (5) otherwise manage the Site in a manner designed to protect
            our rights and property and to facilitate the proper functioning of
            the Site.
          </Text>
          <Text style={styles.tcPH}>PRIVACY POLICY</Text>
          <Text style={styles.tcP}>
            We care about data privacy and security. Please review our Privacy
            Policy. By using the Site, you agree to be bound by ourPrivacy
            Policy, which is incorporated into these Terms of Use. Please be
            advised the Site is hosted in the United States. If you access the
            Site from the European Union, Asia, or any other region of the world
            with laws or other requirements governing personal data collection,
            use, or disclosure that differ from applicable laws in the United
            States, then through your continued use of the Site or Services, you
            are transferring your data to the United States, and you expressly
            consent to have your data transferred to and processed in theUnited
            States. Further, we do not knowingly accept, request, or solicit
            information from children or knowingly market to children.
            Therefore, in accordance with the U.S. Children’s Online Privacy
            Protection Act, if we receive actual knowledge that anyone under the
            age of 15 has provided personal information to us without the
            requisite and verifiable parental consent, we will delete that
            information from the Site as quickly as is reasonably practical.
          </Text>
          <Text style={styles.tcPH}>TERM AND TERMINATION</Text>
          <Text style={styles.tcP}>
            These Terms of Use shall remain in full force and effect while you
            use the Site. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF
            USE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT
            NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SITE (INCLUDING
            BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR
            NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY
            REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE TERMS OF
            USE OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR
            USE OR PARTICIPATION IN THE SITE OR DELETE [YOUR ACCOUNT AND]ANY
            CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING,
            IN OUR SOLE DISCRETION.
          </Text>
          <Text style={styles.tcP}>
            If we terminate or suspend your account for any reason, you are
            prohibited from registering and creating a new account under your
            name, a fake or borrowed name, or the name of any third party, even
            if you may be acting on behalf of the third party. In addition to
            terminating or suspending your account, we reserve the right to take
            appropriate legal action, including without limitation pursuing
            civil, criminal, and injunctive redress.
          </Text>
          <Text style={styles.tcPH}>MODIFICATIONS ANDINTERRUPTIONS</Text>
          <Text style={styles.tcP}>
            We reserve the right to change, modify, or remove the contents of
            the Site at any time or for any reason at our sole discretion
            without notice. However, we have no obligation to update any
            information on our Site. We also reserve the right to modify or
            discontinue all or part of the Site without notice at any time. We
            will not be liable to you or any third party for any modification,
            price change, suspension, or discontinuance of the Site.
          </Text>
          <Text style={styles.tcP}>
            We cannot guarantee the Site will be available at all times. We may
            experience hardware, software, or other problems or need to perform
            maintenance related to the Site, resulting in interruptions, delays,
            or errors. We reserve the right to change, revise, update, suspend,
            discontinue, or otherwise modify the Site at any time or for any
            reason without notice to you. You agree that we have no liability
            whatsoever for any loss, damage, or inconvenience caused by your
            inability to access or use the Site during any downtime or
            discontinuance of the Site. Nothing in these Terms ofUse will be
            construed to obligate us to maintain and support the Site or to
            supply any corrections, updates, or releases in connection
            therewith.
          </Text>
          <Text style={styles.tcPH}>GOVERNING LAW</Text>
          <Text style={styles.tcP}>
            These Terms of Use and your use of the Site are governed by and
            construed in accordance with the laws of the Country of India
            applicable to agreements made and to be entirely performed within
            the Country/Commonwealth of India, without regard to its conflict of
            law principles.
          </Text>
          <Text style={styles.tcPH}>DISPUTE RESOLUTION</Text>
          <Text style={styles.tcPH}>Informal Negotiations</Text>
          <Text style={styles.tcP}>
            To expedite resolution and control the cost of any dispute,
            controversy, or claim related to these Terms of Use (each a"Dispute"
            and collectively, the “Disputes”) brought by either you or us
            (individually, a “Party” and collectively, the “Parties”), the
            Parties agree to first attempt to negotiate any Dispute (except
            those Disputes expressly provided below) informally for at least
            200days before initiating arbitration. Such informal negotiations
            commence upon written notice from one Party to the other Party.
          </Text>
          <Text style={styles.tcPH}>Restrictions</Text>
          <Text style={styles.tcP}>
            The Parties agree that any arbitration shall be limited to the
            Dispute between the Parties individually. To the full extent
            permitted by law, (a) no arbitration shall be joined with any other
            proceeding;(b) there is no right or authority for any Dispute to be
            arbitrated on a class-action basis or to utilize class action
            procedures; and (c) there is no right or authority for any Dispute
            to be brought in a purported representative capacity on behalf of
            the general public or any other persons.
          </Text>
          <Text style={styles.tcPH}>
            Exceptions to [Informal Negotiations and] Arbitration
          </Text>
          <Text style={styles.tcP}>
            The Parties agree that the following Disputes are not subject to the
            above provisions concerning [informal negotiations and]binding
            arbitration: (a) any Disputes seeking to enforce or protect, or
            concerning the validity of, any of the intellectual property rights
            of a Party;(b) any Dispute related to, or arising from, allegations
            of theft, piracy, invasion of privacy, or unauthorized use; and (c)
            any claim for injunctive relief. If this provision is found to be
            illegal or unenforceable, then neitherParty will elect to arbitrate
            any Dispute falling within that portion of this provision found to
            be illegal or unenforceable and such Dispute shall be decided by a
            court of competent jurisdiction within the courts listed for
            jurisdiction above, and the Parties agree to submit to the personal
            jurisdiction of that court.
          </Text>
          <Text style={styles.tcPH}>CORRECTIONS</Text>
          <Text style={styles.tcP}>
            There may be information on the Site that contains typographical
            errors, inaccuracies, or omissions that may relate to the Site,
            including descriptions, pricing, availability, and various other
            information. We reserve the right to correct any errors,
            inaccuracies, or omissions and to change or update the information
            on the Site at any time, without prior notice.
          </Text>
          <Text style={styles.tcPH}>DISCLAIMER</Text>
          <Text style={styles.tcP}>
            THE SITE IS PROVIDED ON AN AS-IS ANDAS-AVAILABLE BASIS. YOU AGREE
            THAT YOUR USE OF THE SITE SERVICES WILL BE ATYOUR SOLE RISK. TO THE
            FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS
            OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR USE THEREOF,
            INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
            NON-INFRINGEMENT. WEMAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE
            ACCURACY OR COMPLETENESS OF THE SITE’S CONTENT OR THE CONTENT OF ANY
            WEBSITES LINKED TO THIS SITE AND WE WILL ASSUME NO LIABILITY OR
            RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF
            CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE,OF ANY
            NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE
            SITE,(3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS
            AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION
            STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO
            OR FROM THE SITE, (5) ANY BUGS,VIRUSES, TROJAN HORSES, OR THE LIKE
            WHICH MAY BE TRANSMITTED TO OR THROUGH THE SITE BY ANY THIRD PARTY,
            AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR
            FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USEOF
            ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE
            SITE.WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY
            FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY
            THROUGH THE SITE, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE
            APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL
            NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY
            TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR
            SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY
            MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGMENT AND
            EXERCISE CAUTION WHERE APPROPRIATE.
          </Text>
          <Text style={styles.tcPH}>LIMITATIONS OF LIABILITY</Text>
          <Text style={styles.tcP}>
            IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES,OR AGENTS BE LIABLE
            TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT,
            CONSEQUENTIAL,EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES,
            INCLUDING LOST PROFIT,LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES
            ARISING FROM YOUR USE OF THE SITE,EVEN IF WE HAVE BEEN ADVISED OF
            THE POSSIBILITY OF SUCH DAMAGES. NOT WITHSTANDING ANYTHING TO THE
            CONTRARY CONTAINED HEREIN, OUR LIABILITY TOYOU FOR ANY CAUSE
            WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL
            TIMES BE LIMITED TO [THE LESSER OF] [THE AMOUNT PAID, IF ANY, BY YOU
            TO US DURING THE TWO MONTH PERIOD PRIOR TO ANY CAUSE OF ACTION
            ARISING . CERTAIN STATE LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED
            WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF
            THESE LAWS APPLY TO YOU,SOME OR ALL OF THE ABOVE DISCLAIMERS OR
            LIMITATIONS MAY NOT APPLY TO YOU, ANDYOU MAY HAVE ADDITIONAL RIGHTS.
          </Text>
          <Text style={styles.tcPH}>INDEMNIFICATION</Text>
          <Text style={styles.tcP}>
            You agree to defend, indemnify, and hold us harmless, including our
            subsidiaries, affiliates, and all of our respective officers,
            agents, partners, and employees, from and against any loss, damage,
            liability, claim, or demand, including reasonable attorneys’ fees
            and expenses, made by any third party due to or arising out of: (1)
            [your Contributions]; (2)use of the Site; (3) breach of these Terms
            of Use; (4) any breach of your representations and warranties set
            forth in these Terms of Use; (5) your violation of the rights of a
            third party, including but not limited to intellectual property
            rights; or (6) any overt harmful act toward any other user of the
            Site with whom you connected via the Site. Notwithstanding the
            foregoing, we reserve the right, at your expense, to assume the
            exclusive defense and control of any matter for which you are
            required to indemnify us, and you agree to cooperate, at your
            expense, with our defense of such claims. We will use reasonable
            efforts to notify you of any such claim, action, or proceeding which
            is subject to this indemnification upon becoming aware of it.
          </Text>
          <Text style={styles.tcPH}>USER DATA</Text>
          <Text style={styles.tcP}>
            We will maintain certain data that you transmit to the Site for the
            purpose of managing the Site, as well as data relating to your use
            of the Site. Although we perform regular routine backups of data,
            you are solely responsible for all data that you transmit or that
            relates to any activity you have undertaken using the Site. You
            agree that we shall have no liability to you for any loss or
            corruption of any such data, and you hereby waive any right of
            action against us arising from any such loss or corruption of such
            data.
          </Text>
          <Text style={styles.tcPH}>
            ELECTRONIC COMMUNICATIONS,TRANSACTIONS, AND SIGNATURES
          </Text>
          <Text style={styles.tcP}>
            Visiting the Site, sending us emails, and completing online forms
            constitute electronic communications. You consent to receive
            electronic communications, and you agree that all agreements,
            notices, disclosures, and other communications we provide to you
            electronically, via email and on the Site, satisfy any legal
            requirement that such communication be in writing. YOU HEREBY AGREE
            TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS,ORDERS, AND OTHER
            RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND
            RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE
            SITE. You hereby waive any rights or requirements under any
            statutes, regulations, rules, ordinances, or other laws in any
            jurisdiction which require an original signature or delivery or
            retention of non-electronic records, or to payments or the granting
            of credits by any means other than electronic means.
          </Text>
          <Text style={styles.tcPH}>CALIFORNIA USERS AND RESIDENTS</Text>
          <Text style={styles.tcP}>
            If any complaint with us is not satisfactorily resolved, you can
            contact the Complaint Assistance Unit of the Division of
            ConsumerServices of the California Department of Consumer Affairs in
            writing at 1625North Market Blvd., Suite N 112, Sacramento,
            California 95834 or by telephone at (800) 952-5210 or (916)
            445-1254.
          </Text>
          <Text style={styles.tcPH}>MISCELLANEOUS</Text>
          <Text style={styles.tcP}>
            These Terms of Use and any policies or operating rules posted by us
            on the Site constitute the entire agreement and understanding
            between you and us. Our failure to exercise or enforce any right or
            provision of these Terms of Use shall not operate as a waiver of
            such right or provision. These Terms of Use operate to the fullest
            extent permissible bylaw. We may assign any or all of our rights and
            obligations to others at anytime. We shall not be responsible or
            liable for any loss, damage, delay, or failure to act caused by any
            cause beyond our reasonable control. If any provision or part of a
            provision of these Terms of Use is determined to be unlawful, void,
            or unenforceable, that provision or part of the provision is deemed
            severable from these Terms of Use and does not affect the validity
            and enforceability of any remaining provisions. There is no joint
            venture, partnership, employ mentor agency relationship created
            between you and us as a result of these Terms ofUse or use of the
            Site. You agree that these Terms of Use will not be construed
            against us by virtue of having drafted them. You hereby waive any
            and all defenses you may have based on the electronic form of these
            Terms of Use and the lack of signing by the parties hereto to
            execute these Terms of Use.
          </Text>
          <Text style={styles.tcPH}>CONTACT US</Text>
          <Text style={styles.tcP}>
            In order to resolve a complaint regarding theSite or to receive
            further information regarding use of the Site, please contact us at:
          </Text>
          <Text style={styles.tcPH}>DietRepo</Text>
          <Text style={styles.tcPH}>India</Text>
          <Text style={styles.tcPH}>dietrepository@gmail.com</Text>
        </ScrollView>
        {showAcceptBtn && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              disabled={!this.state.accepted}
              onPress={() =>
                Alert.alert(
                  'Success',
                  'You have accepted the Terms & Conditions.',
                )
              }
              style={
                this.state.accepted ? styles.button : styles.buttonDisabled
              }>
              <Text style={styles.buttonLabel}>Accept</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      // </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalStyle: {
    flex: 1,
    width: SCREEN_WIDTH,
    margin: 0,
  },
  container: {
    flex: 1,
    //paddingTop: SCREEN_HEIGHT * 0.1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: SCREEN_HEIGHT * 0.06,
    backgroundColor: BG_COLOR,
    paddingTop: DEVICE_NAME.includes('iPhone 11')
      ? SCREEN_HEIGHT * 0.06
      : SCREEN_HEIGHT * 0.03,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: fontsCommon.font24,
    color: styleCommon.textColorWhite,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  headerBtnStyle: {},
  tcPH: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: fontsCommon.font11,
    fontWeight: '700',
    color: styleCommon.textColorWhite,
  },
  tcP: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: fontsCommon.font11,
    color: styleCommon.textColorWhite,
  },
  tcL: {
    marginLeft: 10,
    marginTop: 10,
    // marginBottom: 10,
    fontSize: fontsCommon.font11,
    color: styleCommon.textColorWhite,
  },
  tcContainer: {
    marginTop: 15,
    marginBottom: 25,
    //height: SCREEN_HEIGHT * 0.5,
    backgroundColor: BG_COLOR,
  },

  buttonContainer: {
    marginBottom: SCREEN_HEIGHT * 0.05,
  },

  button: {
    backgroundColor: '#136AC7',
    borderRadius: 5,
    padding: 10,
  },

  buttonDisabled: {
    backgroundColor: '#999',
    borderRadius: 5,
    padding: 10,
  },

  buttonLabel: {
    fontSize: fontsCommon.font14,
    color: '#FFF',
    alignSelf: 'center',
  },
});

export default TermsAndConditions;
